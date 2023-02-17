// Define the initial state outside the component
export const INVOICE_INITIAL_STATE = {
  dateCreated: "",
  dateDue: "",
  billFromEmail: "",
  billFromName: "",
  billFromPhoneNumber: "",
  billToEmail: "",
  billToName: "",
  billToPhoneNumber: "",
  bankName: "",
  accountName: "",
  bankAccount: "",
  itemContainer: [
    {
      itemContent: "",
      itemQty: "",
      itemPrice: "",
    },
  ],
};
// Define the reducer function to handle state updates
export const invoiceFormReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_INVOICE_FORM_DATA":
      const { name, value } = action.payload;
      console.log("name: ", name);
      let index, field;
      if (name.includes("itemContainer")) {
        [index, field] = name.split(".").slice(-2);
        index = parseInt(index);
        console.log(state);
        if (index >= 0 && index < state.invoiceFormData.itemContainer.length) {
          const newItemContainer = [...state.invoiceFormData.itemContainer];
          newItemContainer[index][field] = value;
          return {
            ...state,
            invoiceFormData: {
              ...state.invoiceFormData,
              itemContainer: newItemContainer,
            },
          };
        }
      } else {
        return {
          ...state,
          invoiceFormData: {
            ...state.invoiceFormData,
            [name]: value,
          },
        };
      }

    case "ADD_ITEM_CONTAINER_DATA":
      return {
        ...state,
        invoiceFormData: {
          ...state.invoiceFormData,
          itemContainer: [
            ...state.invoiceFormData.itemContainer,
            {
              itemContent: "",
              itemQty: "",
              itemPrice: "",
            },
          ],
        },
      };

    case "SUBMIT_INVOICE_FORM_DATA":
      const { invoiceFormData } = state;
      return {
        ...state,
        invoiceFormData: initialInvoiceState.invoiceFormData,
        allInvoiceData: [...state.allInvoiceData, invoiceFormData],
      };

    case "UPDATE_ALL_INVOICE_DATA":
      return {
        ...state,
        allInvoiceData: action.payload,
      };

    case "DELETE_INVOICE":
      const { deleteindex } = action.payload;
      const updateDeletedArray = state.allInvoiceData.filter((item, i) => {
        console.log(i, deleteindex);
        return i !== deleteindex;
      });
      console.log(updateDeletedArray);
      return {
        ...state,
        allInvoiceData: updateDeletedArray,
      };

    case "RESET_INVOICE_FORM":
      return action.payload;

    case "ERROR":
      throw new Error(`Unhandled action type: ${action.type}`);
    default:
      return state;
  }
};
