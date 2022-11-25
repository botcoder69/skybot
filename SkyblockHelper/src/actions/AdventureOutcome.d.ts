
import { BaseItemData } from "discord.js";

declare class AdventureOutcome<Type extends keyof AdventureOutcomeTypes> {
    public weight: number;
    public message: string;
	public image?: string;
    public readonly type: Type;
    public readonly reward?: AdventureOutcomeTypeChecker<Type, 'REWARD', BaseItemData, null>;
	public readonly itemTakenMessage?: AdventureOutcomeTypeChecker<Type, 'ITEM_LOSS', string, null>;
   
	/**
     * Set the message for this AdventureOutcome. This will be used as the embed's description.
     * @param {string} message
     */
    public setMessage(message: string): this;

	/**
     * Set the image for this AdventureOutcome. This will be used as the embed's image (if there is one provided).
     * @param {string} image
     */
	public setImage(image: string): this;

	/**
     * Sets the weight of this AdventureOutcome. The sum of all weights must be equal to 100.
     * @param {number} weight
     */
    public setWeight(weight: number): this;
    
	/**
     * Sets the type of this AdventureOutcome
     * @param {'DEATH' | 'FATAL_DEATH' | 'ITEM_LOSS' | 'NOTHING' | 'REWARD'} type
     */
    public setType<AdventureOutcomeType extends keyof AdventureOutcomeTypes>(type: AdventureOutcomeType): AdventureOutcome<AdventureOutcomeType>;
    
	/**
	 * Sets the reward that will be given to the user.
	 * @param {BaseItemData} reward The reward that will be given to the user.
	 */
	public setReward: AdventureOutcomeTypeChecker<Type, 'REWARD', (reward: BaseItemData) => this, null>;

	/**
	 * Sets the message that will display when an item has been taken from the user.
	 * @param {string} message A string that the AdventureEvent will use when saying that the user's item has been taken. You can use \${itemToTake.name} to display the name of the item taken.
	 */
	public setItemTakenMessage: AdventureOutcomeTypeChecker<Type, 'ITEM_LOSS', (message: string) => this, null>;
}

interface AdventureOutcomeTypes {
	DEATH: string;
	FATAL_DEATH: string;
	ITEM_LOSS: string;
	NOTHING: string;
	REWARD: string;
}

type AdventureOutcomeTypeChecker<
	State,
	WantedType,
	TrueType,
	FalseType
> = [State] extends [WantedType] 
	? TrueType
	: FalseType

export = AdventureOutcome;