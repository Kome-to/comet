import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const selectWorkspace = (state: RootState) => state.workspace;

export const selectWorkspaces = createSelector(selectWorkspace, (common) => common.workspaces);
