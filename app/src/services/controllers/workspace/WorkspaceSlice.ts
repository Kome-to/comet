import { WorkspaceDTO } from '@/services/types/apiTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WorkspaceState {
  currentWorkSpaceId: string | null;
  workspaces: WorkspaceDTO[];
}

const initialState: WorkspaceState = {
  currentWorkSpaceId: null,
  workspaces: [],
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {},
});

export const {} = workspaceSlice.actions;

export default workspaceSlice.reducer;
