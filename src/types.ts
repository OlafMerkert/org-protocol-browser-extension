export interface Issue {
  id: string;
  title?: string;
}

export interface IssueData {
  issue: Issue;
  parent?: Issue;
}

export type ProtocolHandler = (params: Record<string, string>) => Promise<void>;
