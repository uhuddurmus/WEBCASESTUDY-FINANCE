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
  paymentPlan: PaymentPlan[];
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
  const response = await axiosInstance.get("/finance/debt");
  return response.data;
});

export const fetchDebtById = createAsyncThunk(
  "finance/fetchDebtById",
  async (id: string) => {
    const response = await axiosInstance.get(`/finance/debt/${id}`);
    return response.data;
  }
);

export const createDebt = createAsyncThunk(
  "finance/createDebt",
  async (debt: Debt) => {
    const response = await axiosInstance.post("/finance/debt", debt);
    return response.data;
  }
);

export const updateDebt = createAsyncThunk(
  "finance/updateDebt",
  async ({ id, debt }: { id: string; debt: Debt }) => {
    const response = await axiosInstance.put(`/finance/debt/${id}`, debt);
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
      });
  },
});

export default debtSlice.reducer;
