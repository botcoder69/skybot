
import { MessagePayload, MessageOptions } from "discord.js";

declare class SkybotAdventureData {
	public constructor();

	public label: string;
	public description: string;
	public value: string;
	public default: boolean;
	public info: SkybotAdventureInformation;

	/**
	 * Sets the label of the Skybot Adventure
	 * @param {string} label The label of this Skybot Adventure. Can be a "title".
	 */ 
	public setLabel(label: string): this;

	/**
	 * Sets the description of the Skybot Adventure
	 * @param {string} description The description of this Skybot Adventure. 
	 */ 
	public setDescription(description: string): this;

	/**
	 * Sets the value of the Skybot Adventure
	 * @param {string} value The value of this Skybot Adventure. Values for Skybot Adventures cannot be repeated.
	 */ 
	public setValue(value: string): this;

	/**
	 * Sets this Skybot Adventure as the default one. Only one Skybot Adventure is allowed to be a default one.
	 * @param {string} value A boolean.
	 */ 
	public setDefault(value: boolean): this;

	/**
	 * Sets the information for this Skybot Adventure
	 * @param info The information of this Skybot Adventure
	 */
	public setInfo(info: SkybotAdventureInformation): this;
	
	/**
	 * Sets the unlock requirements for this Skybot Adventure
	 * @param requirements The requirements to unlock this Skybot Adventure
	 */
	public setUnlockRequirements(requirements: boolean): this;
}

interface SkybotAdventureInformation {
	name: string;
	description: string;
	allowedItems: string[];
}

export = SkybotAdventureData;