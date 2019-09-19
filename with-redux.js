var store = Redux.createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function reducer(state, action) {
	var newState;

	if (state == undefined) {
		return { color: 'yellow' };
	}

	if (action.type === 'CHANGE_COLOR') {
		newState = Object.assign({}, state, { color: action.color });
	}

	console.log(action.type, action, state, newState);
	return newState;
}

function red() {
	var state = store.getState();
	document.querySelector('#red').innerHTML = `
						<div class="container" id="component_red" style="background-color:${state.color}">
							<h1>red</h1> 
							<input type="button" value="fire" onclick="
								store.dispatch({type:'CHANGE_COLOR', color:'red'});
							">
						</div>
					`;
}

function blue() {
	var state = store.getState();
	document.querySelector('#blue').innerHTML = `
						<div class="container" id="component_blue" style="background-color:${state.color}">
							<h1>blue</h1> 
							<input type="button" value="fire" onclick="
								store.dispatch({type:'CHANGE_COLOR', color:'blue'});
							">
						</div>
					`;
}

function green() {
	var state = store.getState();
	document.querySelector('#green').innerHTML = `
						<div class="container" id="component_green" style="background-color:${state.color}">
							<h1>green</h1> 
							<input type="button" value="fire" onclick="
								store.dispatch({type:'CHANGE_COLOR', color:'green'});
							">
						</div>
					`;
}
store.subscribe(red);
store.subscribe(blue);
store.subscribe(green);

red();
blue();
green();
