import { GameObject, Sprite } from 'UnityEngine';
import { Button, Image, Scrollbar } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import CoinManager from './ItemCollectionManager';
import { CollectInfo } from './ItemCollectionManager';
import StartMenuWindow from './StartMenuWindow';
import EndMenuWindow from './EndMenuWindow';

export enum WindowCallType{
    SHOW_START_MENU_WINDOW = 1,
    HIDE_START_MENU_WINDOW = 2,

    SHOW_END_MENU_WINDOW = 3,
    HIDE_END_MENU_WINDOW = 4,
}

export default class UIManager extends ZepetoScriptBehaviour {
    StartMenuWindowGO : GameObject;
    EndMenuWindowGO : GameObject;

    private _startMenuWindow : StartMenuWindow;
    private _endMenuWindow : EndMenuWindow;

    private currentPoints: number = 0;
    public maxPoints = 10;
    
    public healthBarFull: Sprite;
    public healthBarEmpty: Sprite;
    
    public healthBars: Image[];
    public points: Scrollbar;
    
    private maxHealthIndex : number = 2;
    private currentHealthIndex : number = 0;
    
public Start(){
    console.log(this.points); // Add this line to debug
    CoinManager.GetInstance().AddListener((info) => {this.OnItemCollect(info);});
}


public GetPoints(value: number)
{
    let curValue = this.points.size; // Read the current size
    let newValue = curValue + (value / this.maxPoints);
    this.points.size = Math.min(newValue, 1); // Update the size, making sure it doesn't exceed 1

    if (newValue >= 1) // This means that points have reached or exceeded maxPoints
    {
        this.ExecuteWindowCommand(WindowCallType.SHOW_END_MENU_WINDOW);
    }
}



    public get StartMenuWindow(): StartMenuWindow
    {
        if (this._startMenuWindow != undefined)
        {
            return this._startMenuWindow;
        } else {
           return this.StartMenuWindowGO.GetComponent<StartMenuWindow>();
        }
    }

    public get EndMenuWindow(): EndMenuWindow
    {
        if (this._endMenuWindow != undefined)
        {
            return this._endMenuWindow;
        } else {
           return this.EndMenuWindowGO.GetComponent<EndMenuWindow>();
        }
    }
    

    InitWindows() {

    }

    HideAllWindows() {
        this.StartMenuWindow.HideWindow();
        this.EndMenuWindow.HideWindow();
    }

    ExecuteWindowCommand(windowCallType : WindowCallType) {
        switch (windowCallType) {
            case WindowCallType.SHOW_START_MENU_WINDOW:
                this.HideAllWindows();
                this.StartMenuWindow.ShowWindow();
            break;
            case WindowCallType.HIDE_START_MENU_WINDOW:
                this.StartMenuWindow.HideWindow();
            break;
            
            case WindowCallType.SHOW_END_MENU_WINDOW:
                this.HideAllWindows();
                this.EndMenuWindow.ShowWindow();
            break;
            case WindowCallType.HIDE_END_MENU_WINDOW:
                this.EndMenuWindow.HideWindow();
            break;
            
        
            default:
            break;
        }
    }

    public OnItemCollect(info: CollectInfo)
    {
        if (info.tag == "Point")
            this.GetPoints(info.value);
        else if (info.tag == "Health")
        {
            if (this.currentHealthIndex >= 0 && this.currentHealthIndex <= this.maxHealthIndex )
            {
                this.currentHealthIndex--;
                this.SetHealthBar(this.currentHealthIndex, true);
            }
        } else if (info.tag == "Enemy")
        {
            if (this.currentHealthIndex < this.maxHealthIndex )
            {
                this.SetHealthBar(this.currentHealthIndex, false);
                this.currentHealthIndex++;
            }
        }
            
    }
    
    public SetHealthBar(index: number, active: boolean)
    {
        let bar: Image = this.healthBars[index];
        if (active)
            bar.sprite = this.healthBarFull;
        else
            bar.sprite = this.healthBarEmpty;
    }

    public ResetGame() {
        this.currentPoints = 0;
        this.points.size = 0; // Reset the points' scrollbar size
        this.currentHealthIndex = 0; // Reset health
        this.healthBars.forEach((bar, index) => {
            this.SetHealthBar(index, true); // Reset the health bar to full
        });
        this.HideAllWindows();
    }
    
}