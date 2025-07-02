import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { categoryService } from '@/services/category.service';
import type { Category } from '@/types/category';

interface CategoryState {
  categories: Category[];
  category: Category | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await categoryService.getAll();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi tải danh mục');
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'category/fetchCategoryById',
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await categoryService.getById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi tải chi tiết danh mục');
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (dataInput: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const data = await categoryService.create(dataInput);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi tạo danh mục');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, dataInput }: { id: number; dataInput: Partial<Omit<Category, 'id'>> }, { rejectWithValue }) => {
    try {
      const data = await categoryService.update(id, dataInput);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi cập nhật danh mục');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: number, { rejectWithValue }) => {
    try {
      await categoryService.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi xóa danh mục');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
        state.category = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories = state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        );
        state.isLoading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer; 