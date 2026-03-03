import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'


let orderSlice = createSlice({
  name: 'orders',
  initialState: [
    {
      orderId: 1772530033876,
      buyerName: "하정우",
      address: "서울시 강남구 한빛타워 1206호",
      amount: 57000,
      date: "2026. 3. 3. 오후 6:27:54",
      status: "대기",
      items: [
        { id: 39, name: "봄꽃사슴", price: 39000, count: 1, img: "/pet-bit/assets/springflower_deer-BDHLhva4.png" },
        { id: 40, name: "알파카", price: 18000, count: 1, img: "/pet-bit/assets/alpaca.png" }
      ]
    },
    {
      orderId: 1772530033877,
      buyerName: "김태리",
      address: "서울시 송파구 올림픽로 100",
      amount: 18000,
      date: "2026. 3. 3. 오후 7:00:00",
      status: "배송중",
      items: [
        { id: 8, name: "펭귄", price: 20000, count: 1, img: "/pet-bit/assets/penguin.png" }
      ]
    }
  ],

  reducers: {

    addOrder(state, action) {
      
      state.unshift(action.payload);
    },
    updateStatus: (state, action: PayloadAction<{id: number; status: string}>) => {
      const { id, status } = action.payload;
      const order = state.find(item => item.orderId === id);
      if (order) {
        order.status = status;
      }
    }
  }
})


export let { addOrder, updateStatus } = orderSlice.actions;
export default orderSlice.reducer;