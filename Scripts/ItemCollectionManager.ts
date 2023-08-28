import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {UnityAction$1, UnityEvent, UnityEvent$1} from "UnityEngine.Events";
import ItemCollection from './ItemCollection';
import { GameObject } from 'UnityEngine';

export interface CollectInfo
{
    tag: string;
    value: number;
}

interface CollectEvent {
    (value: CollectInfo): void;
}

export default class ItemCollectionManager extends ZepetoScriptBehaviour {
    public static GetInstance(): ItemCollectionManager
    {
        if (ItemCollectionManager.instance == undefined) 
        {
            ItemCollectionManager.instance = new GameObject("ItemCollectionManager").AddComponent<ItemCollectionManager>();
        }
        return ItemCollectionManager.instance;
    }

    private static instance : ItemCollectionManager;

    public onCollect : CollectEvent[] = new Array<CollectEvent>();
    private itemMap: Map<number, ItemCollection> = new Map<number, ItemCollection>();

    private coinsCount = 0;

    public AddCoin(item : ItemCollection)
    {
        this.itemMap.set(this.coinsCount, item);
        item.SetItemID(this.coinsCount);
        this.coinsCount++;
    }

    public RemoveCoin(id: number)
    {
        this.itemMap.delete(id);
    }

    public AddListener(event: CollectEvent)
    {
        this.onCollect.push(event);
    }

    public CollectCoin(id: number)
    {
        let coin : ItemCollection = this.itemMap.get(id);
        this.onCollect.forEach((event) => {
            event({tag: coin.tag, value: coin.itemValue});
        });
    }
}