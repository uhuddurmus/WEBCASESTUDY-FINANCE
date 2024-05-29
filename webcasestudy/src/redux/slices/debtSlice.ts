import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

type PaymentPlan = {
  paymentDate: string;
  paymentAmount: number;
  isPaid?: boolean;
};

type Debt = {
  debtName: string;
  lenderName: string;
  debtAmount: number;
  interestRate: number;
  amount: number;
  paymentStart: string;
  installment: number;
  description: string;
  paymentPlan: any[];
};

type DebtState = {
  debts: Debt[];
  selectedDebt?: Debt;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: DebtState = {
  debts: [],
  selectedDebt: undefined,
  status: "idle",
  error: null,
};

export const fetchDebts = createAsyncThunk("finance/fetchDebts", async () => {
  function UpdateDebts(debts: any) {
    return debts.map((debt: any) => {
      let lastDebt = debt.amount;
      debt.paymentPlan.forEach((paymentPlan: any) => {
        if (paymentPlan.isPaid) {
          lastDebt -= paymentPlan.paymentAmount;
        }
      });
      return {
        ...debt,
        lastDebt: lastDebt
      };
    });
  }

  const response = await axiosInstance.get("/finance/debt");
  
  const promises = response.data.data.map(async (item: any) => {
    const datapaymentPlan = await axiosInstance.get(`/finance/payment-plans/${item.id}`);
    return {
      ...item,
      paymentPlan: datapaymentPlan.data.data
    };
  });

  const product = await Promise.all(promises);
  const results = UpdateDebts(product);

  return results;
});


export const fetchDebtById = createAsyncThunk(
  "finance/fetchDebtById",
  async (id: string) => {
    const response = await axiosInstance.get(`finance/debt/${id}`);
    return response.data;
  }
);

export const createDebt = createAsyncThunk(
  "finance/debt",
  async (debt: any) => {
    const response = await axiosInstance.post("finance/debt", debt);
    return response.data;
  }
);

export const updateDebt = createAsyncThunk(
  "finance/updateDebt",
  async ({ id, debt }: { id: string; debt: Debt }) => {
    const response = await axiosInstance.put(`finance/debt/${id}`, debt);
    return response.data;
  }
);

export const deleteDebt = createAsyncThunk(
  "finance/deleteDebt",
  async (id: string) => {
    await axiosInstance.delete(`/finance/debt/${id}`);
    return id;
  }
);

export const fetchPaymentPlan = createAsyncThunk(
  "finance/fetchPaymentPlan",
  async (id: string) => {
    const response = await axiosInstance.get(`/finance/payment-plans/${id}`);
    return response.data;
  }
);

export const updatePaymentPlan = createAsyncThunk(
  "finance/updatePaymentPlan",
  async ({ id, paymentPlan }: { id: string; paymentPlan: any }) => {
    console.log(paymentPlan)
    console.log(id)
    const response = await axiosInstance.put(
      `/finance/payment-plans/${id}`,
      paymentPlan
    );
    return response.data;
  }
);

const debtSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDebts.fulfilled, (state, action: PayloadAction<Debt[]>) => {
        state.status = "idle";
        state.debts = action.payload;
      })
      .addCase(fetchDebts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Fetching debts failed";
      })

      .addCase(fetchDebtById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDebtById.fulfilled,
        (state, action: PayloadAction<Debt>) => {
          state.status = "idle";
          state.selectedDebt = action.payload;
        }
      )
      .addCase(fetchDebtById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Fetching debt failed";
      })

      .addCase(createDebt.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDebt.fulfilled, (state, action: PayloadAction<Debt>) => {
        state.status = "idle";
        state.debts.push(action.payload);
      })
      .addCase(createDebt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Creating debt failed";
      })

      .addCase(updateDebt.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDebt.fulfilled, (state, action: PayloadAction<Debt>) => {
        state.status = "idle";
        const index = state.debts.findIndex(
          (debt) => debt.debtName === action.payload.debtName
        );
        if (index !== -1) {
          state.debts[index] = action.payload;
        }
      })
      .addCase(updateDebt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Updating debt failed";
      })

      .addCase(deleteDebt.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDebt.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.debts = state.debts.filter(
          (debt) => debt.debtName !== action.payload
        );
      })
      .addCase(deleteDebt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Deleting debt failed";
      })
      .addCase(fetchPaymentPlan.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPaymentPlan.fulfilled,
        (state, action: PayloadAction<PaymentPlan>) => {
          state.status = "idle";
          // Burada ne yapmak istediğinize göre state'i güncelleyebilirsiniz
        }
      )
      .addCase(fetchPaymentPlan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Fetching payment plan failed";
      })

      .addCase(updatePaymentPlan.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updatePaymentPlan.fulfilled,
        (state, action: PayloadAction<PaymentPlan>) => {
          state.status = "idle";
          // Burada ne yapmak istediğinize göre state'i güncelleyebilirsiniz
        }
      )
      .addCase(updatePaymentPlan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Updating payment plan failed";
      });
  },
});

export default debtSlice.reducer;
