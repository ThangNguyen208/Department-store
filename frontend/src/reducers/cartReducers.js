import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_DELIVERY_ADDRESS,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state /* tôi sẽ không thay đổi thuộc tính khác và ở đây tôi chỉ đi để cập nhật các mặt hàng trong giỏ hàng */,
          error: "",
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, error: "",cartItems: [...state.cartItems, item] };
      }
    // /* lọc sản phẩm mà ý tưởng của nó ngang bằng với hành động */ tieng viet cc ak
    case CART_REMOVE_ITEM:
      return {
        ...state,
        error: "",
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    case CART_SAVE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    case CART_ADD_ITEM_FAIL:
      return {...state, error: action.payload};
    case CART_EMPTY:
      return { ...state, error: "",cartItems: [] };
    default:
      return state;
  }
};
