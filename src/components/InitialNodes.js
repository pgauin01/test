export const initailNodes = [
  {
    id: "A",
    position: { x: 0, y: 0 },
    data: {
      label: "First Node",
      type: "TRIGGER",
      description: "First Node",
      children: { current: "A", previous: null, next: ["place"] }
    },
    type: "nodeWithButton",
    draggable: false
  },
  {
    id: "place",
    data: {
      label: "First Node",
      type: "TRIGGER",
      children: { current: "place", previous: "A", next: [] },
      description: "First Node"
    },
    position: { x: 0, y: 150 },
    type: "placeholder"
  }
];
