export const initialInvoiceFormData = {
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

export const invoiceFormReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATE_CREATED":
      return { ...state, dateCreated: action.payload };
    case "UPDATE_DATE_DUE":
      return { ...state, dateDue: action.payload };
    case "UPDATE_BILL_FROM_EMAIL":
      return { ...state, billFromEmail: action.payload };
    case "UPDATE_BILL_FROM_NAME":
      return { ...state, billFromName: action.payload };
    case "UPDATE_BILL_FROM_PHONE_NUMBER":
      return { ...state, billFromPhoneNumber: action.payload };
    case "UPDATE_BILL_TO_EMAIL":
      return { ...state, billToEmail: action.payload };
    case "UPDATE_BILL_TO_NAME":
      return { ...state, billToName: action.payload };
    case "UPDATE_BILL_TO_PHONE_NUMBER":
      return { ...state, billToPhoneNumber: action.payload };
    case "UPDATE_BANK_NAME":
      return { ...state, bankName: action.payload };
    case "UPDATE_ACCOUNT_NAME":
      return { ...state, accountName: action.payload };
    case "UPDATE_BANK_ACCOUNT":
      return { ...state, bankAccount: action.payload };
    case "ADD_ITEM_CONTAINER":
      return {
        ...state,
        itemContainer: [...state.itemContainer, action.payload],
      };
    case "UPDATE_ITEM_CONTAINER":
      return {
        ...state,
        itemContainer: state.itemContainer.map((item, index) =>
          index === action.payload.index
            ? { ...item, [action.payload.field]: action.payload.value }
            : item
        ),
      };
    // Submit invoice data to firebase
    case "updateField":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "addItem":
      return {
        ...state,
        itemContainer: [
          ...state.itemContainer,
          { itemContent: "", itemQty: "", itemPrice: "" },
        ],
      };
    case "updateItemField":
      return {
        ...state,
        itemContainer: state.itemContainer.map((item, index) =>
          index === action.itemIndex
            ? {
                ...item,
                [action.field]: action.value,
              }
            : item
        ),
      };
    case "ERROR":
      throw new Error();
    default:
      return state;
  }
};

// const [invoiceFormData, dispatch] = useReducer(invoiceFormReducer, initialState);

// const handleInvoiceSubmit = async (e) => {
//   e.preventDefault();
//   const checkEmptyInput = Object.values(invoiceFormData);
//   if (checkEmptyInput.some((input) => !input)) {
//     alert("please fill out all fields");
//     return;
//   }

//   setFirebaseAllInvoiceArray((prevdata) => {
//     return [...prevdata, invoiceFormData];
//   });
//   console.log(firebaseAllInvoiceArray);

//   // Save to firestore and fetch the updated data from function below
//   handleUpdateDataInFirebase(firebaseAllInvoiceArray);
//   // from function above
//   fetchInvoiceData();
//   setShowAllInvoice(true);
//   dispatch({
//     type: "reset",
//   });
// };

// function invoiceReducer(state, action) {
//   switch (action.type) {
//     case 'UPDATE_FORM_DATA':
//       return { ...state, ...action.payload };
//     case 'RESET_FORM_DATA':
//       return initialState;
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// }

// function InvoiceForm() {
//   const [invoiceFormData, dispatch] = useReducer(invoiceReducer, initialState);

//   const handleInvoiceSubmit = async (e) => {
//     e.preventDefault();
//     const checkEmptyInput = Object.values(invoiceFormData);
//     if (checkEmptyInput.some((input) => !input)) {
//       alert('please fill out all fields');
//       return;
//     }

//     // Save to firestore and fetch the updated data from function below
//     handleUpdateDataInFirebase(invoiceFormData);
//     // from function above
//     fetchInvoiceData();

//     dispatch({ type: 'RESET_FORM_DATA' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     dispatch({
//       type: 'UPDATE_FORM_DATA',
//       payload: { [name]: value },
//     });
//   };

//   return (
//     <form onSubmit={handleInvoiceSubmit}>
//       {/* render your form inputs with handleInputChange */}
//     </form>
//   );
// }
