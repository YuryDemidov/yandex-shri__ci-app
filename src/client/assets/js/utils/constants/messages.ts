export namespace MESSAGES {
  export enum ERROR {
    emptyCommitHash = 'Please, fill in commit hash',
    noChanges = 'Data was not modified',
    nonNumberPeriod = 'Period must contain only numeric symbols',
    required = 'Please, fill in all required fields',
  }

  export enum SUCCESS {
    send = 'Your settings was successfully updated',
  }
}
