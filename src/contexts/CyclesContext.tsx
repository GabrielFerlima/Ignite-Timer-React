import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
    task: string 
    minutesAmount: number
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishDate?: Date;
}
 
interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType )

interface CyclesContextProviderProbs {
    children: ReactNode
}
export function CyclesContextProvider({children}: CyclesContextProviderProbs) {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

       
    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
  }

    function markCurrentCycleAsFinished() {
        setCycles((state)=> state.map((cycles)=> {
            if(cycles.id == activeCycleId) {
                return {...cycles, finishDate: new Date()}
            } else {
                return cycles
            }
        }),
        
        )
    }


    function createNewCycle(data: CreateCycleData) {
    
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        //reset();
    } 

    function interruptCurrentCycle() {
        setCycles( state => 
            state.map((cycles)=> {
                if(cycles.id == activeCycleId) {
                    return {...cycles, interruptedDate: new Date()}
                } else {
                    return cycles
                }
            }),
        )
        setActiveCycleId(null)
    }


    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed, setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
            
          }}
          > 
          {children}
          </CyclesContext.Provider>
    )
}