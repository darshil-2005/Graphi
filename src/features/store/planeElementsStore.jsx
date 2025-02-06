import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { fetchAllFilesUserHasAccessTo, DBSync, planeElementsAndGraphElementFetcher } from '@/app/server/actions'

const initialState = {
  plane: [],
  planeElements: [],
  graphElements: [],
  userDataFiles: [],
  deltas: [],
}

//? {type: planeElement/graphElement, id: id}

function addToDeltasArray(receivedObject, deltas) {

  for (let i = 0; i < deltas.length; i++) {
    if (deltas[i].id == receivedObject.id) { return false }
  }

  return true
}

const usePlaneElementsStore = create(
  immer((set, get) => ({
    plane: initialState.plane,
    planeElements: initialState.planeElements,
    graphElements: initialState.graphElements,
    userDataFiles: initialState.userDataFiles,
    deltas: initialState.deltas,

    elementsFetcherFromDatabaseOnOpeningProject: async (planeIdArray) => {

      const response = await planeElementsAndGraphElementFetcher(planeIdArray);
      
      set((state) => {

        const planeElementsResponse = response.planeElements.map((d) => {
          return d.planeElementJsonData
        })

        const graphElementsResponse = response.graphElements.map((d) => {
          return d.graphElementsJsonData
        })

        state.planeElements = [...(state.planeElements), ...(planeElementsResponse)]
        state.graphElements = [...(state.graphElements), ...(graphElementsResponse)]

      })

    },

    setUserFiles: async () => {
      const userDataFileObjects = await fetchAllFilesUserHasAccessTo();
      set((state) => {
        state.userDataFiles = userDataFileObjects;
      })
    },

    syncDeltasInDB: async (planeIdArray) => {

      const planeElementsToBeSynced = [];
      const graphElementsToBeSynced = [];

      for (let i = 0; i < get().planeElements.length; i++) {

        if (planeIdArray.includes(get().planeElements[i].planeId)) {
          planeElementsToBeSynced.push(get().planeElements[i])
        }
      }

      for (let i = 0; i < get().graphElements.length; i++) {
        if (planeIdArray.includes(get().graphElements[i].planeId)) {
          graphElementsToBeSynced.push(get().graphElements[i])
        }
      }

      const response = await DBSync(planeElementsToBeSynced, graphElementsToBeSynced)

    },

    handleResize: (payload) => {

      set((state) => {
        const res = addToDeltasArray({ type: 'planeElement', id: payload.graphId }, state.deltas);
        if (res) {
          state.deltas.push({ type: 'planeElement', id: payload.graphId })
        }

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
        const res = addToDeltasArray({ type: 'planeElement', id: payload.graphId }, state.deltas);
        if (res) {
          state.deltas.push({ type: 'planeElement', id: payload.graphId })
        }

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
        const res = addToDeltasArray({ type: 'planeElement', id: payload.graph.graphId }, state.deltas);
        if (res) {
          state.deltas.push({ type: 'planeElement', id: payload.graph.graphId })
        }
        state.planeElements.push(payload.graph);
      });
    },

    handleEditing: (payload) => {
      set((state) => {

        const res = addToDeltasArray({ type: 'planeElement', id: payload.graphId }, state.deltas);
        if (res) {
          state.deltas.push({ type: 'planeElement', id: payload.graphId })
        }

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
          const res = addToDeltasArray({ type: 'planeElement', id: state.planeElements[payload.index].graphId }, state.deltas);
          if (res) {
            state.deltas.push({ type: 'planeElement', id: state.planeElements[payload.index].graphId })
          }

          state.planeElements[payload.index][payload.property] = payload.propertyValue;
        });
      }
    },

    addGraphObjGraphElementsArray: (payload) => {
      set((state) => {
        const res = addToDeltasArray({ type: 'graphElement', id: payload.newGraphElement.elementId }, state.deltas);
        if (res) {
          state.deltas.push({ type: 'graphElement', id: payload.newGraphElement.elementId })
        }

        state.graphElements.push(payload.newGraphElement);
      });
    },


    deleteElementFromElementsArray: (graphId) => {
      set((state) => {
        const res = addToDeltasArray({ type: 'planeElement', id: graphId }, state.deltas);
        if (res) {
          state.deltas.push({ type: 'planeElement', id: graphId })
        }
        state.graphElements = state.graphElements.filter((d, i) => {
          return graphId != d.graphId
        })
        state.planeElements = state.planeElements.filter((obj) =>
          String(obj.graphId) !== String(graphId)
        );
      });
    },

    handleGraphElementsArrayEditing: (payload) => {
      set((state) => {

        const res = addToDeltasArray({ type: 'graphElement', id: payload.elementId }, state.deltas);
        if (res) {
          state.deltas.push({ type: 'graphElement', id: payload.elementId })
        }
        for (let j = 0; j < state.graphElements.length; j++) {
          if (String(state.graphElements[j].elementId) === payload.elementId) {
            for (let key in payload) {
              state.graphElements[j][key] = payload[key];
            }
          }
        }
      });
    },

    deleteElementFromGraphElementsArray: (payload) => {
      set((state) => {

        const res = addToDeltasArray({ type: 'graphElement', id: payload.elementId }, state.deltas);
        if (res) {
          state.deltas.push({ type: 'graphElement', id: payload.elementId })
        }
        state.graphElements = state.graphElements.filter((d, i) => {
          return d.elementId != payload.elementId
        })
      });

    },

  }))
)

export default usePlaneElementsStore;
