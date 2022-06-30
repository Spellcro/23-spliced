interface Method {
  name: string;
  placeNotation: string;
}

export interface MethodDataset {
  stage: number;
  methods: Method[];
}
