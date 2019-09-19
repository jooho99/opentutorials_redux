function subject() {
	document.querySelector('#subject').innerHTML = `
		<header>
			<h1>WEB</h1>
			Hello, WEB!
			</header>			
			`;
}

function TOC() {
	var state = store.getState();
	var i = 0;
	var liTags = '';
	while (i < state.contents.length) {
		liTags += `
				<li>
					<a onclick="
							event.preventDefault();
							var action = {type:'SELECT', id:${state.contents[i].id}}
							store.dispatch(action);
						" href="${state.contents[i].id}">
							${state.contents[i].title}
					</a>
				</li>
				`;
		i = i + 1;
	}
	document.querySelector('#toc').innerHTML = `
			<nav>
				<ol>${liTags}</ol>
			</nav>
			`;
}

function control() {
	document.querySelector('#control').innerHTML = `
			<ul>
				<li><a onclick="
					event.preventDefault();
					store.dispatch({
						type: 'CHANGE_MODE',
						mode: 'create'
					});
				" href="/create">create</a></li>
				<li><input onclick="
					store.dispatch({
						type: 'DELETE'
					});
				" type="button" value="delete"></li>
			</ul>
			`;
}


function article() {
	var state = store.getState();

	if (state.mode === 'create') {
		document.querySelector('#content').innerHTML = `
				<article>
					<form onsubmit="
						event.preventDefault();
						var title = this.title.value;
						var desc = this.desc.value;
						store.dispatch({
							type: 'CREATE',
							title: title,
							desc: desc
						})
					">
						<p>
							<input type="text" name="title" placeholder="title">
						</p>
						<p>
							<textarea name="desc" placeholder="description"></textarea>
						</p>
						<p>
							<input type="submit">
						</p>
					</form>
				</article>
				`;
	} else if (state.mode === 'read') {
		var i = 0;
		var aTitle, aDesc;
		while (i < state.contents.length) {
			if (state.contents[i].id === state.selected_id) {
				aTitle = state.contents[i].title;
				aDesc = state.contents[i].desc;
				break;
			}
			i = i + 1;
		}
		document.querySelector('#content').innerHTML = `
				<article>
					<h2>${aTitle}</h2>
					${aDesc}
				</article>
				`;
	} else if (state.mode === 'welcome') {
		document.querySelector('#content').innerHTML = `
				<article>
					<h2>Welcome</h2>
					Hello, Redux!!!
				</article>
				`;
	}
}

function reducer(state, action) {
	if (state === undefined) {
		// 초기 데이터 전달
		return {
			max_id: 2,
			mode: 'create',
			selected_id: 1,
			contents: [
				{ id: 1, title: 'HTML', desc: 'HTML is ...' },
				{ id: 2, title: 'CSS', desc: 'CSS is ...' }
			]
		};
	}

	var newState;
	if (action.type === 'SELECT') {
		newState = Object.assign({}, state, {
			mode: 'read',
			selected_id: action.id
		});
	} else if (action.type === 'CREATE') {
		var newMaxId = state.max_id + 1;
		var newContents = state.contents.concat();
		newContents.push({ id: newMaxId, title: action.title, desc: action.desc });
		newState = Object.assign({}, state, {
			max_id: newMaxId,
			mode: 'read',
			selected_id: newMaxId,
			contents: newContents
		});
	} else if (action.type === 'DELETE') {
		var newContents = [];
		var i = 0;
		while (i < state.contents.length) {
			if (state.selected_id !== state.contents[i].id) {
				newContents.push(state.contents[i]);
			}
			i = i + 1;
		}
		newState = Object.assign({}, state, {
			contents: newContents,
			mode: 'welcome'
		});
	} else if (action.type === 'CHANGE_MODE') {
		newState = Object.assign({}, state, {
			mode: action.mode
		});
	}
	console.log(action, state, newState);

	return newState;
}
var store = Redux.createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(TOC);
store.subscribe(article);

subject();
TOC();
control();
article();