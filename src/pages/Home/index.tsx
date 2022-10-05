import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import  * as zod from 'zod'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useContext } from "react";

import { CountDown } from "./components/CountDown";
import { NewCycleForm } from "./components/NewCycleForm";
import { CyclesContext } from "../../contexts/CyclesContext";

    
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5)
    .max(60, 'Máximo é 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

    export function Home() {
    const {activeCycle,createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0, 
          },
    })

    const {handleSubmit, watch, /*reset*/ } = newCycleForm


     const task = watch('task')
    const isSubmitDisable = !task 

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                <NewCycleForm/>
                </FormProvider>
                <CountDown />
                

                {activeCycle ? (
                  <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                  <HandPalm size={24}/>
                  Pausar
              </StopCountdownButton >
                ):(
                    <StartCountdownButton disabled={isSubmitDisable} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton >
                )}
            </form>
        </HomeContainer>
    )
}