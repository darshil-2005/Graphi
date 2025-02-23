import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { fetchAllFilesUserHasAccessTo, DBSync, planeElementsAndGraphElementFetcher } from '@/app/server/actions'

const initialState = {
  plane: [],
  planeElements: [],
  graphElements: [],
  userDataFiles: [],
}

const usePlaneElementsStore = create(
  immer((set, get) => ({
    plane: initialState.plane,
    planeElements: initialState.planeElements,
    graphElements: initialState.graphElements,
    userDataFiles: initialState.userDataFiles,

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

    saveElements: async (planeIdArray) => {

      console.log(planeIdArray)

      const fileredPlaneElements = get().planeElements.filter((d) => {

        if (planeIdArray.includes(d.planeId)) {

          return true
        }
        
        return false
      })

      const filteredGraphElements = get().graphElements.filter((d) => {

        if ( planeIdArray.includes(d.planeId) ) {

          return true
        }

        return false
      })

      await DBSync( fileredPlaneElements, filteredGraphElements );



    },


    //* ADD ELEMENTS IN STATE ELEMENTS


    addPlaneElements: (payload) => {
      set((state) => {

        const planeId = payload.graph.planeId;
        const releventPlaneElements = get().planeElements.filter((d) => d.planeId == planeId);

        
        let zIndexArray = [];
        
        for ( let _ of releventPlaneElements) {
          
          console.log("Rele: ", _.zIndex)
          zIndexArray.push(Number(_.zIndex));

        }

        
        console.log("ZIndex Ayyat2: ", zIndexArray)
        const maxZIndex = Math.max(...zIndexArray, 0);
        console.log("ZIndex Ayyat: ", maxZIndex)




        const tempPushObj = payload.graph;
        tempPushObj.zIndex = Number(maxZIndex) + 1;
        tempPushObj.isdeleted = false;
        state.planeElements.push(tempPushObj);
      });
    },

    addGraphObjGraphElementsArray: (payload) => {
      set((state) => {


        const tempPushObj = payload.newGraphElement;
        tempPushObj.isdeleted = false;
        state.graphElements.push(tempPushObj);
      });
    },


    //* EDIT ELEMENTS IN STATE ELEMENTS


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

    handleGraphElementsArrayEditing: (payload) => {
      set((state) => {

        for (let j = 0; j < state.graphElements.length; j++) {
          if (String(state.graphElements[j].elementId) === payload.elementId) {
            for (let key in payload) {
              state.graphElements[j][key] = payload[key];
            }
          }
        }
      });
    },


    deleteElementFromElementsArray: (graphId) => {
      set((state) => {

        state.graphElements = state.graphElements.filter((d) => {
          return graphId != d.graphId
        })
        for (let i = 0; i < state.planeElements.length; i++) {
          if (String(state.planeElements[i].graphId) === String(graphId)) {
            state.planeElements[i].isdeleted = true;
          }
        }

      });
    },


    deleteElementFromGraphElementsArray: (payload) => {
      set((state) => {


        for (let j = 0; j < state.graphElements.length; j++) {
          if (String(state.graphElements[j].elementId) === payload.elementId) {

            state.graphElements[j].isdeleted = true;
          }
        }



      }
      );
    },

  }))
)

export default usePlaneElementsStore;
