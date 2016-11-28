import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ListsService } from '../services/lists.service';


@Component({
	selector: 'item-editor',
	templateUrl: './app/item-editor/item-editor.html',
	styleUrls: ['./app/item-editor/item-editor.css']
})

export class ItemEditorComponent {

	@Input() model: any[];

	_itemEntry: any;
	placeholder: string;
	autocomplete : any[];
    autocompleteUrl: string = "http://138.197.207.203/api/autocomplete/";

	constructor(private listsService : ListsService, 
				private http: Http) {
		this.placeholder = "Item name...";
		this._itemEntry = {};
	}

	ngOnInit() {
		this.sortByPosition();
	}

	addItem() {
		this._itemEntry.list_id = this.model.length + 1;
		this.model.push(this._itemEntry);
		this._itemEntry = {};
	}

	removeItem(index: number) {
		this.model.splice(index, 1);
	}

	swapItems(index1: number, index2: number) {
		// Skip swaps for out of range indices
		if(index1 < 0 || index2 >= this.model.length) {
			return;
		}
		// Get element at index2
		let tempItem: any[] = this.model.slice(index2, index2 + 1);
		// Get positions in list of items at index1 and index2
		let index1Position: number = this.model[index1].position;
		let index2Position: number = this.model[index2].position;
		// Copy element at index1 to element at index2
		this.model.copyWithin(index2, index1, index1 + 1);
		this.model[index2].position = index2Position;
		// Set element at index1 equal to element at index2
		this.model[index1] = tempItem[0];
		this.model[index1].position = index1Position;
	}

	reassignPositions() {
		for(let i=0; i<this.model.length; i++) {
			this.model[i].position = i+1;
		}
	}

	// Sort json item objects by name using custom compare function
	sortByName() {
		this.model.sort(function(a: any, b: any):number {
			if(a.name < b.name)
				return -1;
			else if (a.name > b.name)
				return 1;
			else
				return 0;
		});
		this.reassignPositions();
	}

	sortByAisle() {
		this.model.sort(function(a: any, b: any):number {
			if(a.aisle_num < b.aisle_num)
				return -1;
			else if (a.aisle_num > b.aisle_num)
				return 1;
			else
				return 0;
		});
		this.reassignPositions();
	}

	sortByPosition() {
		this.model.sort(function(a: any, b:any):number {
			if(a.position < b.position)
				return -1;
			else if (a.position > b.position)
				return 1;
			else
				return 0;
		});
	}

	autoComplete(event) {
        if(event.target.value !== "" && event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 && event.keyCode !== 40) {
            this.listsService.getAutocomplete(event.target.value).then(x => this.autocomplete = x);;
            // console.log(this.autocomplete)
        }
    }

}
