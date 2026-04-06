export interface Issue {
  id: string;
  title?: string | undefined;
}

export interface IssueData {
  issue: Issue;
  parent?: Issue;
}

export type ProtocolHandler = (params: Record<string, string>) => Promise<void>;
