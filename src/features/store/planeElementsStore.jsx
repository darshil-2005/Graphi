import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const initialState = {
  plane: [],
  planeElements: [],
}

const usePlaneElementsStore = create(
  immer((set, get) => ({
    planeElements: initialState.planeElements,
    plane: initialState.plane,

    
    


    handleZIndex: (graphId) => {
      set((state) => {
        for (let i = 0; i < state.planeElements.length; i++) {
          if (String(state.planeElements[i].graphId) == String(graphId.graphId)) {
            state.planeElements[i].zIndex = state.planeElements.length;
          } else {
            state.planeElements[i].zIndex = Math.max(0, state.planeElements[i].zIndex - 1);
          }
        }
      });
    },

    handleResize: (payload) => {
      set((state) => {
        for (let i = 0; i < state.planeElements.length; i++) {
          if (String(state.planeElements[i].graphId) === String(payload.graphId)) {
            state.planeElements[i].height = payload.height;
            state.planeElements[i].width = payload.width;
          }
        }
      });
    },

    updatePosition: (payload) => {
      set((state) => {
        for (let i = 0; i < state.planeElements.length; i++) {
          if (String(state.planeElements[i].graphId) === String(payload.graphId)) {
            state.planeElements[i].top = payload.top;
            state.planeElements[i].left = payload.left;
          }
        }
      });
    },

    addPlaneElements: (payload) => {
      set((state) => {
        state.planeElements.push(payload.graph);
      });
    },

    handleEditing: (payload) => {
      set((state) => {
        for (let i = 0; i < state.planeElements.length; i++) {
          if (String(state.planeElements[i].graphId) === String(payload.graphId)) {
            for (let key in payload) {
              state.planeElements[i][key] = payload[key]
            }
          }
        }
      });
    },

    updateGraphObjInPlaneElements: (payload) => {
      if (payload.index >= 0 && payload.index < get().planeElements.length) {
        set((state) => {
          state.planeElements[payload.index][payload.property] = payload.propertyValue;
        });
      }
    },

    addGraphObjGraphElementsArray: (payload) => {
      set((state) => {
        state.planeElements[payload.index]['graphElementsArray'].push(payload.newGraphElement);
      });
    },
    
    deleteElementFromElementsArray: (graphId) => {
      set((state) => {
        state.planeElements = state.planeElements.filter((obj) =>
          String(obj.graphId) !== String(graphId)
        );
      });
    },
    
    handleEditing: (payload) => {
      set((state) => {
        for (let i = 0; i < state.planeElements.length; i++) {
          if (String(state.planeElements[i].graphId) === String(payload.graphId)) {
            for (let key in payload) {
              state.planeElements[i][key] = payload[key];
            }
          }
        }
      });
    },

    handleGraphElementsArrayEditing: (payload) => {
      set((state) => {
        for (let i = 0; i < state.planeElements.length; i++) {
          if (String(state.planeElements[i].graphId) === String(payload.graphId)) {
            for (let j = 0; j < state.planeElements[i].graphElementsArray.length; j++) {
              if (String(state.planeElements[i].graphElementsArray[j].elementId) === payload.elementId) {
                for (let key in payload) {
                  state.planeElements[i].graphElementsArray[j][key] = payload[key];
                }
              }
            }
          }
        }
      });
    },

    deleteElementFromGraphElementsArray: (payload) => {
      set((state) => {
        for (let i = 0; i < state.planeElements.length; i++) {
          if (String(state.planeElements[i].graphId) === String(payload.graphId)) {
            for (let j = 0; j < state.planeElements[i].graphElementsArray.length; j++) {
              if (state.planeElements[i].graphElementsArray[j].elementId === payload.elementId) {
                state.planeElements[i].graphElementsArray.splice(j, 1);
              }
            }
          }
        }
      });
      
    },

  }))
)

export default usePlaneElementsStore;
