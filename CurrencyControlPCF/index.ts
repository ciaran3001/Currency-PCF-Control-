import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import { CurrencyInputProps, CurrencyInputOnChangeValues } from "./Components/CurrencyInputProps";
import CurrencyComponent from "./Components/CurrencyComponent";
import CurrencyInput from "./CurrencyInput";
import "./Style/bootstrap.min.css";



import * as React from "react";




export class CurrencyControlPCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {


    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    public symbol : string = "";
    public InputValue : string;
    public ValFromControl : string;

    public outputs: IOutputs = {
		inputtedValue: undefined
	}
    
    private valout : string | undefined = " ";
    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(context: ComponentFramework.Context<IInputs>,notifyOutputChanged: () => void, state: ComponentFramework.Dictionary): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.symbol = context.parameters.Prefix.raw || "";
        this.InputValue = context.parameters.DefaultValue.raw || "";
    }


    public handleOnValueChange(_value: string | undefined, fieldName: string | undefined): void {

    }
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */


    public getChangedValue (val : string | undefined) : void{
        console.log("changed to" + val);
        //this.ValFromControl = val || "";
        this.outputs.inputtedValue = val || "";
       

        //this.notifyOutputChanged();

    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this.symbol = context.parameters.Prefix.raw || "";
        this.InputValue = context.parameters.DefaultValue.raw || "";

        return React.createElement(
            CurrencyComponent,
        {
           // id:"validation-example-3-field2",
            //name:"field2",
           // className:'form-control' , //${state.field2.validationClass}
            
          //  onValueChange:  {handleOnValueChange} ,
            _prefix: this.symbol,
            defaultValue :  this.InputValue,
            OutputObj : this.outputs,
            notifyOutputChanged : this.notifyOutputChanged
        }
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        console.log("PCFJS:getOutputs");
        return this.outputs;
              //inputtedValue : this.valout
         //this.outputs;
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}


