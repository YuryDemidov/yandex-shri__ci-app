import { History } from 'history';

export interface DbBuildModel {
  id: string;
  configurationId: string;
  buildNumber: number;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  status: BuildStatus;
  start?: string;
  duration?: number;
}

export interface DbConfigModel {
  id: string;
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

export type BuildStatus = 'Waiting' | 'InProgress' | 'Success' | 'Fail' | 'Canceled';

export type BuildLog = string;

export type BuildRequestData = {
  commitHash: string;
  history: History;
  onError: (error: Error) => void;
  onSuccess?: () => void;
};

export type BuildParamsRequestData = Pick<DbBuildModel, 'commitMessage' | 'commitHash' | 'branchName' | 'authorName'>;

export type BuildStartData = {
  id: string;
  datetime: string;
};

export type BuildFinishData = {
  buildId: string;
  duration: number;
  success: boolean;
  buildLog: BuildLog;
};

export type BuildListParams = {
  limit?: number;
  offset?: number;
};

export type BuildCancelData = Pick<DbBuildModel, 'id'>;

export type SettingsChangeData = Omit<DbConfigModel, 'id'>;
