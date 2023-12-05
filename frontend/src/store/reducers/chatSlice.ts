import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
  EntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { User } from "./userSlice";

interface ChatRoom {
  roomId: number;
  partnerUser: {
    userId: number;
    userName: string;
    userImage: string;
  };
}

interface ChatMessage {
  messageId: number;
  roomId: number;
  text: string;
  senderId: number;
  receiverId: number;
  sentAt: Date;
  sender: User;
  receiver: User;
}

export interface ChatState {
  chatRooms: EntityState<ChatRoom>;
  chatMessages: Record<number, EntityState<ChatMessage>>;
  loading: boolean;
  error: string | null;
}

export interface CreateChatRoomPayload {
  userId: number;
  partnerId: number;
}

export interface SendChatMessagePayload {
  userId: number;
  roomId: number;
  senderId: number;
  receiverId: number;
  text: string;
}

interface SendChatMessageResponse {
  message: string;
  newMessage: ChatMessage;
}

// ChatRoom, ChatMessage 엔티티 어댑터 생성
export const chatRoomAdapter: EntityAdapter<ChatRoom> =
  createEntityAdapter<ChatRoom>({
    selectId: (chatRoom) => chatRoom.roomId,
  });

export const chatMessageAdapter: EntityAdapter<ChatMessage> =
  createEntityAdapter<ChatMessage>({
    selectId: (chatMessage) => chatMessage.messageId,
    sortComparer: (a, b) => a.messageId - b.messageId,
  });

const initialState: ChatState = {
  chatRooms: chatRoomAdapter.getInitialState(),
  chatMessages: {},
  loading: false,
  error: "",
};

// 특정 userId로 채팅방 목록을 가져오는 비동기 액션
export const fetchChatRooms = createAsyncThunk(
  "chat/fetchChatRooms",
  async (userId: number) => {
    try {
      // 채팅방 목록을 가져오는 비동기 요청
      const response = await axios.get(`/api/chat/user/${userId}`);
      return response.data as ChatRoom[];
    } catch (error) {
      throw Error("DM 목록 조회에 실패하였습니다.");
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (roomId: number) => {
    try {
      // 특정 채팅방의 채팅 메시지 목록을 가져오는 비동기 요청
      const response = await axios.get(`/api/chat/room/${roomId}`);
      return { roomId, messages: response.data } as {
        roomId: number;
        messages: ChatMessage[];
      };
    } catch (error) {
      throw Error("DM 메시지 조회에 실패하였습니다.");
    }
  }
);

export const createNewChatRoom = createAsyncThunk(
  "chat/createNewChatRoom",
  async (payload: CreateChatRoomPayload) => {
    try {
      // 새로운 채팅방 생성
      const { userId, partnerId } = payload;
      const response = await axios.post(`/api/chat/create`, {
        userId: userId,
        partnerId: partnerId,
      });

      return response.data as ChatRoom;
    } catch (error) {
      throw Error("DM 보내기에 실패하였습니다.");
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  "chat/sendChatMessage",
  async (payload: SendChatMessagePayload) => {
    try {
      // 채팅 메시지를 서버에 전송하는 비동기 요청
      const { userId, roomId, senderId, receiverId, text } = payload;
      const response = await axios.post(`/api/chat/send/${roomId}`, {
        userId,
        roomId,
        senderId,
        receiverId,
        text,
      });
      return response.data as SendChatMessageResponse;
    } catch (error) {
      throw Error("DM 보내기에 실패하였습니다.");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.loading = false;
        chatRoomAdapter.setAll(state.chatRooms, action.payload);
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { roomId, messages } = action.payload;

        // state.chatMessages[roomId]가 없다면 빈 객체로 초기화
        if (!state.chatMessages[roomId]) {
          state.chatMessages[roomId] = chatMessageAdapter.getInitialState();
        }

        const existingIds = state.chatMessages[roomId].ids;
        const updatedEntities = chatMessageAdapter.upsertMany(
          state.chatMessages[roomId],
          messages
        );

        // 'ids'를 중복 없이 유지.
        state.chatMessages[roomId].ids = Array.from(
          new Set([...existingIds, ...updatedEntities.ids])
        );
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(createNewChatRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewChatRoom.fulfilled, (state, action) => {
        state.loading = false;
        chatRoomAdapter.addOne(state.chatRooms, action.payload);
      })
      .addCase(createNewChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      })
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        const newMessage = action.payload.newMessage;
        const roomId = newMessage.roomId;

        // state.chatMessages[roomId]가 없다면 빈 객체로 초기화
        if (!state.chatMessages[roomId]) {
          state.chatMessages[roomId] = chatMessageAdapter.getInitialState();
        }

        chatMessageAdapter.upsertOne(state.chatMessages[roomId], newMessage);
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "";
      });
  },
});

// ChatRoom과 ChatMessage를 위한 선택자 정의
export const selectChatRooms = (state: RootState) => state.chat.chatRooms;
export const selectChatRoomById = (roomId: number) => {
  return createSelector(
    selectChatRooms,
    (chatRooms) => chatRoomAdapter.getSelectors().selectById(chatRooms, roomId)
  );
};

export const selectChatMessagesByRoomId = (roomId: number) => {
  return createSelector(
    (state: RootState) => state.chat.chatMessages,
    (chatMessages) => {
      const chatMessagesByRoomId = chatMessages[roomId];
      if (
        chatMessagesByRoomId &&
        chatMessagesByRoomId.ids &&
        chatMessagesByRoomId.entities
      ) {
        const entities = chatMessagesByRoomId.entities;
        return chatMessagesByRoomId.ids.map((messageId) => entities[messageId]);
      }
      return [];
    }
  );
};

// ChatRoom, ChatMessage 상태 선택자들
export const selectChatState = (state: RootState) => state.chat;
export const selectIsLoading = (state: RootState) => state.chat.loading;
export const selectError = (state: RootState) => state.chat.error;

// chatSlice와 관련된 액션 및 리듀서 내보내기
export const { actions: chatActions, reducer: chatReducer } = chatSlice;
export default chatSlice.reducer;
