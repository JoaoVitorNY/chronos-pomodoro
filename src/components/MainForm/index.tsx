import { DefaultInput } from "../DefaultInput"
import { DefaultButton } from "../DefaultButton"
import { Cycles } from "../Cycles"
import { PlayCircleIcon } from "lucide-react"

export function MainForm() {
  return (
    <form className='form' action="">
      <div className="formRow">
        <DefaultInput labelText="Task" type="text" id="task" placeholder="Digite algo" />                
      </div>
    
      <div className="formRow">
        <p>Lorem ipsum dolor sit amet</p>                    
      </div>
    
      <div className="formRow">
        <Cycles />
      </div>
    
      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon/>} color="green" />                  
      </div>
    </form>
  )
}