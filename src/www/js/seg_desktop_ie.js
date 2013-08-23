
var u, Util = u = new function() {}
u.version = "current";
u.bug = function() {}
u.stats = new function() {this.pageView = function(){};this.event = function(){};this.customVar = function(){}}

Util.testURL = function(url) {
	return true;
	return document.domain.match(/.local$|^w\./);
}
Util.debug = function(output) {
	if(Util.testURL()) {
		var element, br;
		if(Util.debugWindow && Util.debugWindow.document) {
			element = Util.debugWindow.document.createTextNode(output);
			br = Util.debugWindow.document.createElement('br');
			Util.debugWindow.document.body.appendChild(element);
			Util.debugWindow.document.body.appendChild(br);
			Util.debugWindow.scrollBy(0,1000);
		}
		else {
			Util.openDebugger();
			if(!Util.debugWindow) {
				alert("Disable popup blocker!");
			}
			else {
				Util.debug(output);
			}
		}
	}
}
Util.debugWindow = false;
Util.openDebugger = function() {
	Util.debugWindow = window.open("", "debugWindow", "width=600, height=400, scrollbars=yes, resizable=yes");
	Util.debugWindow.document.body.style.fontFamily = "Courier";
	var element = Util.debugWindow.document.createTextNode("--- new session ---");
	var br = Util.debugWindow.document.createElement('br');
	Util.debugWindow.document.body.appendChild(br);
	Util.debugWindow.document.body.appendChild(element);
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
}
Util.tracePointer = function(e) {
	if(Util.testURL()) {
		var position = document.createElement("div");
		document.body.appendChild(position);
		position.id = "debug_pointer";
		position.style.position = "absolute";
		position.style.backgroundColor = "#ffffff";
		position.style.color = "#000000";
		this.trackMouse = function(event) {
			u.ge("debug_pointer").innerHTML = event.pageX+"x"+event.pageY;
			u.ge("debug_pointer").style.left = 7+event.pageX+"px";
			u.ge("debug_pointer").style.top = 7+event.pageY+"px";
		}
		u.e.addEvent(e, "mousemove", this.trackMouse);
	}
}
Util.bug = function(target, message, color) {
	if(Util.testURL()) {
		var option, options = new Array(new Array(0, "auto", "auto", 0), new Array(0, 0, "auto", "auto"), new Array("auto", 0, 0, "auto"), new Array("auto", "auto", 0, 0));
		if((!color && !message) || (!color && isNaN(target))) {
			color = message;
			message = target;
			target = 0;
		}
		if(!color) {
			color = "black";
		}
		if(!u.ge("debug_"+target)) {
			for(var i = 0; option = options[i]; i++) {
				if(!u.ge("debug_id_"+i)) {
					var d_target = document.createElement("div");
					document.body.appendChild(d_target);
					d_target.style.position = "absolute";
					d_target.style.zIndex = 100;
					d_target.style.top = option[0];
					d_target.style.right = option[1];
					d_target.style.bottom = option[2];
					d_target.style.left = option[3];
					d_target.style.backgroundColor = "#ffffff";
					d_target.style.color = "#000000";
					d_target.style.textAlign = "left";
					d_target.style.padding = "3px";
					d_target.id = "debug_id_"+i;
					d_target.className = "debug_"+target;
					break;
				}
			}
		}
		u.ae(u.ge("debug_"+target), "div", ({"style":"color: " + color})).innerHTML = message;
	}
}
Util.htmlToText = function(string) {
	return string.replace(/>/g, "&gt;").replace(/</g, "&lt;");
}
Util.listObjectContent = function(object) {
	var x, s = "-s-<br>";
	for(x in object) {
		if(object[x] && typeof(object[x]) == "object" && typeof(object[x].nodeName) == "string") {
			s += x + "=" + object[x]+" -> " + u.nodeId(object[x]) + "<br>";
		}
		else {
			s += x + "=" + object[x]+"<br>";
		}
	}
	s += "-e-"
	return s;
}
Util.nodeId = function(node) {
	return node.id ? node.id : (node.className ? node.className : (node.name ? node.name : node.nodeName));
}
if(!Array.prototype.unshift || new Array(1,2).unshift(0) != 3) {
	Array.prototype.unshift = function(a) {
		var b;
		this.reverse();
		b = this.push(a);
		this.reverse();
		return b
	};
}
if(!Array.prototype.shift) {
	Array.prototype.shift = function() {
		for(var i = 0, b = this[0], l = this.length-1; i < l; i++ ) {
			this[i] = this[i+1];
		}
		this.length--;
		return b;
	};
}
if(!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		for(var i = (start || 0); i < this.length; i++) {
			if(this[i] == obj) {
				return i;
			}
		}
		return -1;
	}
}

Util.cutString = function(string, length) {
	var matches, i;
	if(string.length <= length) {
		return string;
	}
	else {
	length = length-3;
	}
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; match = matches[i]; i++){
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.randomKey = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "1234567890abcdefghijklmnopqrstuvwxyz".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}
Util.stringOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
if(String.prototype.trim == undefined) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
}
if(Object.prototype.textContent == undefined && Object.defineProperty) {
	Object.defineProperty(Element.prototype, "textContent",
		{get: function() {
			return this.innerText;
			}
		}
	);
}
else if(Object.prototype.textContent == undefined) {
}
if(String.prototype.substr == undefined || "ABC".substr(-1,1) == "A") {
	String.prototype.substr = function(start_index, length) {
		start_index = start_index < 0 ? this.length + start_index : start_index;
		start_index = start_index < 0 ? 0 : start_index;
		length = length ? start_index + length : this.length;
		return this.substring(start_index, length);
	};
}

Util.getElement = u.ge = function(identifier, target) {
	var e, i, regexp, t;
	t = target ? target : document;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			return e;
		}
	}
	return t.getElementsByTagName(identifier).length ? t.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, target) {
	var e, i, regexp, t;
	var elements = new Array();
	t = target ? target : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			elements.push(e);
		}
	}
	return elements.length ? elements : t.getElementsByTagName(identifier);
}
Util.querySelector = u.qs = function(query, target) {
	t = target ? target : document;
	return t.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, target) {
	t = target ? target : document;
	return t.querySelectorAll(query);
}
Util.getSibling = u.gs = function(e, direction) {
	try {
		var node_type = e.nodeType;
		var ready = false;
		var prev_node = false;
		for(var i = 0; node = e.parentNode.childNodes[i]; i++) {
			if(node.nodeType == node_type) {
				if(ready) {
					return node;
				}
				if(node == e) {
					if(direction == "next") {
						ready = true;
					}
					else {
						return prev_node;
					}
				}
				else {
					prev_node = node;
				}
			}
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.gs, called from: "+arguments.callee.caller);
	}
}
Util.previousSibling = u.ps = function(e, exclude) {
	var node = e.previousSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.nodeType == 8 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.previousSibling;
		}
	}
	else {
		while(node && (node.nodeType == 3 || node.nodeType == 8)) {
			node = node.previousSibling;
		}
	}
	return node;
}
Util.nextSibling = u.ns = function(e, exclude) {
	var node = e.nextSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.nodeType == 8 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.nextSibling;
		}
	}
	else {
		while(node && (node.nodeType == 3 || node.nodeType == 8)) {
			node = node.nextSibling;
		}
	}
	return node;
}
Util.appendElement = u.ae = function(e, node_type, attributes) {
	try {
		var node = e.appendChild(document.createElement(node_type));
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ae, called from: "+arguments.callee.caller.name);
		u.bug("e="+e + ":nodename="+e.nodeName + ":id="+e.id + ":classname="+e.classname + ":attributes=" + attribute);
	}
}
Util.insertElement = u.ie = function(e, node_type, attributes) {
	try {
		var node = e.insertBefore(document.createElement(node_type), e.firstChild);
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.getIJ, called from: "+arguments.callee.caller);
	}
}
Util.getIJ = function(e, id) {
	try {
		var regexp = new RegExp(id + ":[?=\\w/\\#~:.?+=?&%@!\\-]*");
		if(e.className.match(regexp)) {
			return e.className.match(regexp)[0].replace(id + ":", "");
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.getIJ, called from: "+arguments.callee.caller);
	}
}
Util.setClass = u.sc = function(e, classname) {
	try {
		e.className = classname;
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.setClass, called from: "+arguments.callee.caller);
	}
}
Util.addClass = u.ac = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
			if(!regexp.test(e.className)) {
				e.className += e.className ? " " + classname : classname;
				e.offsetTop;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.addClass, called from: "+arguments.callee.caller);
	}
}
Util.removeClass = u.rc = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp(classname + " | " + classname + "|" + classname);
			e.className = e.className.replace(regexp, "");
			e.offsetTop;
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.toggleClass = u.tc = function(e, classname, second_classname) {
	try {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(regexp.test(e.className)) {
			Util.removeClass(e, classname);
			if(second_classname) {
				Util.addClass(e, second_classname);
			}
			return second_classname;
		}
		else {
			Util.addClass(e, classname);
			if(second_classname) {
				Util.removeClass(e, second_classname);
			}
			return classname;
		}
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.toggleClass, called from: "+arguments.callee.caller);
	}
}
Util.hasClass = u.hc = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
			if(regexp.test(e.className)) {
				return true;
			}
			else {
				return false;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.hasClass, called from: "+arguments.callee.caller);
	}
	return false;
}
Util.applyStyle = u.as = function(e, style, value) {
	try {
		e.style[style] = value;
		e.offsetHeight;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.applyStyle("+u.nodeId(e)+", "+style+", "+value+") called from: "+arguments.callee.caller);
	}
}
Util.getComputedStyle = u.gcs = function(e, attribute) {
	e.offsetHeight;
	if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(e, null).getPropertyValue(attribute);
	}
	return false;
}
Util.wrapElement = u.we = function(e, wrap, attributes) {
	wrap = e.parentNode.insertBefore(document.createElement(wrap), e);
	if(attributes) {
		for(attribute in attributes) {
			wrap.setAttribute(attribute, attributes[attribute]);
		}
	}
	wrap.appendChild(e);
	return wrap;
}

Util.getComputedStyle = u.gcs = function(e, attribute) {
	e.offsetHeight;
	if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(e, null).getPropertyValue(attribute);
	}
	else if(document.body.currentStyle && attribute != "opacity") {
		attribute = attribute.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		return e.currentStyle[attribute].replace("px", "");
	}
	else if(document.body.currentStyle && attribute == "opacity" && e.currentStyle["filter"]) {
		var match = e.currentStyle["filter"].match(/Opacity=([0-9]+)/);
		if(match) {
			return match[1]/100;
		}
	}
	return false;
}
Util.appendElement = u.ae = function(e, node_type, attributes) {
	try {
		var node = e.appendChild(document.createElement(node_type));
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					if(!document.all || (attribute != "class" && attribute != "type")) {
						node.setAttribute(attribute, attributes[attribute]);
					}
				}
				if(document.all && attributes["class"]) {
					u.addClass(node, attributes["class"]);
				}
				if(document.all && attributes["type"]) {
					node.type = attributes["type"];
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ae, called from: "+arguments.callee.caller.name);
		u.bug("e="+e + ":nodename="+e.nodeName + ":"+(e.id ? ("id="+e.id) : ("classname="+e.className)) + ":node_type="+node_type+":attributes=" + attributes);
	}
}
Util.insertElement = u.ie = function(e, node_type, attributes) {
	var node = e.insertBefore(document.createElement(node_type), e.firstChild);
	if(attributes) {
		if(typeof(attributes) == "object") {
			for(attribute in attributes) {
				node.setAttribute(attribute, attributes[attribute]);
			}
			if(document.all && attributes["class"]) {
				u.addClass(node, attributes["class"]);
			}
		}
		else {
			u.addClass(node, attributes)
		}
	}
	return node;
}
if(document.querySelector == undefined) {
	(function(){
	var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
		expando = "sizcache" + (Math.random() + '').replace('.', ''),
		done = 0,
		toString = Object.prototype.toString,
		hasDuplicate = false,
		baseHasDuplicate = true,
		rBackslash = /\\/g,
		rReturn = /\r\n/g,
		rNonWord = /\W/;
	[0, 0].sort(function() {
		baseHasDuplicate = false;
		return 0;
	});
	var Sizzle = function( selector, context, results, seed ) {
		results = results || [];
		context = context || document;
		var origContext = context;
		if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
			return [];
		}
		if ( !selector || typeof selector !== "string" ) {
			return results;
		}
		var m, set, checkSet, extra, ret, cur, pop, i,
			prune = true,
			contextXML = Sizzle.isXML( context ),
			parts = [],
			soFar = selector;
		do {
			chunker.exec( "" );
			m = chunker.exec( soFar );
			if ( m ) {
				soFar = m[3];
				parts.push( m[1] );
				if ( m[2] ) {
					extra = m[3];
					break;
				}
			}
		} while ( m );
		if ( parts.length > 1 && origPOS.exec( selector ) ) {
			if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
				set = posProcess( parts[0] + parts[1], context, seed );
			} else {
				set = Expr.relative[ parts[0] ] ?
					[ context ] :
					Sizzle( parts.shift(), context );
				while ( parts.length ) {
					selector = parts.shift();
					if ( Expr.relative[ selector ] ) {
						selector += parts.shift();
					}
					set = posProcess( selector, set, seed );
				}
			}
		} else {
			if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
					Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
				ret = Sizzle.find( parts.shift(), context, contextXML );
				context = ret.expr ?
					Sizzle.filter( ret.expr, ret.set )[0] :
					ret.set[0];
			}
			if ( context ) {
				ret = seed ?
					{ expr: parts.pop(), set: makeArray(seed) } :
					Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
				set = ret.expr ?
					Sizzle.filter( ret.expr, ret.set ) :
					ret.set;
				if ( parts.length > 0 ) {
					checkSet = makeArray( set );
				} else {
					prune = false;
				}
				while ( parts.length ) {
					cur = parts.pop();
					pop = cur;
					if ( !Expr.relative[ cur ] ) {
						cur = "";
					} else {
						pop = parts.pop();
					}
					if ( pop == null ) {
						pop = context;
					}
					Expr.relative[ cur ]( checkSet, pop, contextXML );
				}
			} else {
				checkSet = parts = [];
			}
		}
		if ( !checkSet ) {
			checkSet = set;
		}
		if ( !checkSet ) {
			Sizzle.error( cur || selector );
		}
		if ( toString.call(checkSet) === "[object Array]" ) {
			if ( !prune ) {
				results.push.apply( results, checkSet );
			} else if ( context && context.nodeType === 1 ) {
				for ( i = 0; checkSet[i] != null; i++ ) {
					if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
						results.push( set[i] );
					}
				}
			} else {
				for ( i = 0; checkSet[i] != null; i++ ) {
					if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
						results.push( set[i] );
					}
				}
			}
		} else {
			makeArray( checkSet, results );
		}
		if ( extra ) {
			Sizzle( extra, origContext, results, seed );
			Sizzle.uniqueSort( results );
		}
		return results;
	};
	Sizzle.uniqueSort = function( results ) {
		if ( sortOrder ) {
			hasDuplicate = baseHasDuplicate;
			results.sort( sortOrder );
			if ( hasDuplicate ) {
				for ( var i = 1; i < results.length; i++ ) {
					if ( results[i] === results[ i - 1 ] ) {
						results.splice( i--, 1 );
					}
				}
			}
		}
		return results;
	};
	Sizzle.matches = function( expr, set ) {
		return Sizzle( expr, null, null, set );
	};
	Sizzle.matchesSelector = function( node, expr ) {
		return Sizzle( expr, null, null, [node] ).length > 0;
	};
	Sizzle.find = function( expr, context, isXML ) {
		var set, i, len, match, type, left;
		if ( !expr ) {
			return [];
		}
		for ( i = 0, len = Expr.order.length; i < len; i++ ) {
			type = Expr.order[i];
			if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
				left = match[1];
				match.splice( 1, 1 );
				if ( left.substr( left.length - 1 ) !== "\\" ) {
					match[1] = (match[1] || "").replace( rBackslash, "" );
					set = Expr.find[ type ]( match, context, isXML );
					if ( set != null ) {
						expr = expr.replace( Expr.match[ type ], "" );
						break;
					}
				}
			}
		}
		if ( !set ) {
			set = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( "*" ) :
				[];
		}
		return { set: set, expr: expr };
	};
	Sizzle.filter = function( expr, set, inplace, not ) {
		var match, anyFound,
			type, found, item, filter, left,
			i, pass,
			old = expr,
			result = [],
			curLoop = set,
			isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );
		while ( expr && set.length ) {
			for ( type in Expr.filter ) {
				if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
					filter = Expr.filter[ type ];
					left = match[1];
					anyFound = false;
					match.splice(1,1);
					if ( left.substr( left.length - 1 ) === "\\" ) {
						continue;
					}
					if ( curLoop === result ) {
						result = [];
					}
					if ( Expr.preFilter[ type ] ) {
						match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );
						if ( !match ) {
							anyFound = found = true;
						} else if ( match === true ) {
							continue;
						}
					}
					if ( match ) {
						for ( i = 0; (item = curLoop[i]) != null; i++ ) {
							if ( item ) {
								found = filter( item, match, i, curLoop );
								pass = not ^ found;
								if ( inplace && found != null ) {
									if ( pass ) {
										anyFound = true;
									} else {
										curLoop[i] = false;
									}
								} else if ( pass ) {
									result.push( item );
									anyFound = true;
								}
							}
						}
					}
					if ( found !== undefined ) {
						if ( !inplace ) {
							curLoop = result;
						}
						expr = expr.replace( Expr.match[ type ], "" );
						if ( !anyFound ) {
							return [];
						}
						break;
					}
				}
			}
			if ( expr === old ) {
				if ( anyFound == null ) {
					Sizzle.error( expr );
				} else {
					break;
				}
			}
			old = expr;
		}
		return curLoop;
	};
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	var getText = Sizzle.getText = function( elem ) {
	    var i, node,
			nodeType = elem.nodeType,
			ret = "";
		if ( nodeType ) {
			if ( nodeType === 1 || nodeType === 9 ) {
				if ( typeof elem.textContent === 'string' ) {
					return elem.textContent;
				} else if ( typeof elem.innerText === 'string' ) {
					return elem.innerText.replace( rReturn, '' );
				} else {
					for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText( elem );
					}
				}
			} else if ( nodeType === 3 || nodeType === 4 ) {
				return elem.nodeValue;
			}
		} else {
			for ( i = 0; (node = elem[i]); i++ ) {
				if ( node.nodeType !== 8 ) {
					ret += getText( node );
				}
			}
		}
		return ret;
	};
	var Expr = Sizzle.selectors = {
		order: [ "ID", "NAME", "TAG" ],
		match: {
			ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
			ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
			TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
		},
		leftMatch: {},
		attrMap: {
			"class": "className",
			"for": "htmlFor"
		},
		attrHandle: {
			href: function( elem ) {
				return elem.getAttribute( "href" );
			},
			type: function( elem ) {
				return elem.getAttribute( "type" );
			}
		},
		relative: {
			"+": function(checkSet, part){
				var isPartStr = typeof part === "string",
					isTag = isPartStr && !rNonWord.test( part ),
					isPartStrNotTag = isPartStr && !isTag;
				if ( isTag ) {
					part = part.toLowerCase();
				}
				for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
					if ( (elem = checkSet[i]) ) {
						while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}
						checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
							elem || false :
							elem === part;
					}
				}
				if ( isPartStrNotTag ) {
					Sizzle.filter( part, checkSet, true );
				}
			},
			">": function( checkSet, part ) {
				var elem,
					isPartStr = typeof part === "string",
					i = 0,
					l = checkSet.length;
				if ( isPartStr && !rNonWord.test( part ) ) {
					part = part.toLowerCase();
					for ( ; i < l; i++ ) {
						elem = checkSet[i];
						if ( elem ) {
							var parent = elem.parentNode;
							checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
						}
					}
				} else {
					for ( ; i < l; i++ ) {
						elem = checkSet[i];
						if ( elem ) {
							checkSet[i] = isPartStr ?
								elem.parentNode :
								elem.parentNode === part;
						}
					}
					if ( isPartStr ) {
						Sizzle.filter( part, checkSet, true );
					}
				}
			},
			"": function(checkSet, part, isXML){
				var nodeCheck,
					doneName = done++,
					checkFn = dirCheck;
				if ( typeof part === "string" && !rNonWord.test( part ) ) {
					part = part.toLowerCase();
					nodeCheck = part;
					checkFn = dirNodeCheck;
				}
				checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
			},
			"~": function( checkSet, part, isXML ) {
				var nodeCheck,
					doneName = done++,
					checkFn = dirCheck;
				if ( typeof part === "string" && !rNonWord.test( part ) ) {
					part = part.toLowerCase();
					nodeCheck = part;
					checkFn = dirNodeCheck;
				}
				checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
			}
		},
		find: {
			ID: function( match, context, isXML ) {
				if ( typeof context.getElementById !== "undefined" && !isXML ) {
					var m = context.getElementById(match[1]);
					return m && m.parentNode ? [m] : [];
				}
			},
			NAME: function( match, context ) {
				if ( typeof context.getElementsByName !== "undefined" ) {
					var ret = [],
						results = context.getElementsByName( match[1] );
					for ( var i = 0, l = results.length; i < l; i++ ) {
						if ( results[i].getAttribute("name") === match[1] ) {
							ret.push( results[i] );
						}
					}
					return ret.length === 0 ? null : ret;
				}
			},
			TAG: function( match, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( match[1] );
				}
			}
		},
		preFilter: {
			CLASS: function( match, curLoop, inplace, result, not, isXML ) {
				match = " " + match[1].replace( rBackslash, "" ) + " ";
				if ( isXML ) {
					return match;
				}
				for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
					if ( elem ) {
						if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
							if ( !inplace ) {
								result.push( elem );
							}
						} else if ( inplace ) {
							curLoop[i] = false;
						}
					}
				}
				return false;
			},
			ID: function( match ) {
				return match[1].replace( rBackslash, "" );
			},
			TAG: function( match, curLoop ) {
				return match[1].replace( rBackslash, "" ).toLowerCase();
			},
			CHILD: function( match ) {
				if ( match[1] === "nth" ) {
					if ( !match[2] ) {
						Sizzle.error( match[0] );
					}
					match[2] = match[2].replace(/^\+|\s*/g, '');
					var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
						match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
						!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);
					match[2] = (test[1] + (test[2] || 1)) - 0;
					match[3] = test[3] - 0;
				}
				else if ( match[2] ) {
					Sizzle.error( match[0] );
				}
				match[0] = done++;
				return match;
			},
			ATTR: function( match, curLoop, inplace, result, not, isXML ) {
				var name = match[1] = match[1].replace( rBackslash, "" );
				if ( !isXML && Expr.attrMap[name] ) {
					match[1] = Expr.attrMap[name];
				}
				match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );
				if ( match[2] === "~=" ) {
					match[4] = " " + match[4] + " ";
				}
				return match;
			},
			PSEUDO: function( match, curLoop, inplace, result, not ) {
				if ( match[1] === "not" ) {
					if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
						match[3] = Sizzle(match[3], null, null, curLoop);
					} else {
						var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
						if ( !inplace ) {
							result.push.apply( result, ret );
						}
						return false;
					}
				} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
					return true;
				}
				return match;
			},
			POS: function( match ) {
				match.unshift( true );
				return match;
			}
		},
		filters: {
			enabled: function( elem ) {
				return elem.disabled === false && elem.type !== "hidden";
			},
			disabled: function( elem ) {
				return elem.disabled === true;
			},
			checked: function( elem ) {
				return elem.checked === true;
			},
			selected: function( elem ) {
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
				return elem.selected === true;
			},
			parent: function( elem ) {
				return !!elem.firstChild;
			},
			empty: function( elem ) {
				return !elem.firstChild;
			},
			has: function( elem, i, match ) {
				return !!Sizzle( match[3], elem ).length;
			},
			header: function( elem ) {
				return (/h\d/i).test( elem.nodeName );
			},
			text: function( elem ) {
				var attr = elem.getAttribute( "type" ), type = elem.type;
				return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
			},
			radio: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
			},
			checkbox: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
			},
			file: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
			},
			password: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
			},
			submit: function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && "submit" === elem.type;
			},
			image: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
			},
			reset: function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && "reset" === elem.type;
			},
			button: function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && "button" === elem.type || name === "button";
			},
			input: function( elem ) {
				return (/input|select|textarea|button/i).test( elem.nodeName );
			},
			focus: function( elem ) {
				return elem === elem.ownerDocument.activeElement;
			}
		},
		setFilters: {
			first: function( elem, i ) {
				return i === 0;
			},
			last: function( elem, i, match, array ) {
				return i === array.length - 1;
			},
			even: function( elem, i ) {
				return i % 2 === 0;
			},
			odd: function( elem, i ) {
				return i % 2 === 1;
			},
			lt: function( elem, i, match ) {
				return i < match[3] - 0;
			},
			gt: function( elem, i, match ) {
				return i > match[3] - 0;
			},
			nth: function( elem, i, match ) {
				return match[3] - 0 === i;
			},
			eq: function( elem, i, match ) {
				return match[3] - 0 === i;
			}
		},
		filter: {
			PSEUDO: function( elem, match, i, array ) {
				var name = match[1],
					filter = Expr.filters[ name ];
				if ( filter ) {
					return filter( elem, i, match, array );
				} else if ( name === "contains" ) {
					return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;
				} else if ( name === "not" ) {
					var not = match[3];
					for ( var j = 0, l = not.length; j < l; j++ ) {
						if ( not[j] === elem ) {
							return false;
						}
					}
					return true;
				} else {
					Sizzle.error( name );
				}
			},
			CHILD: function( elem, match ) {
				var first, last,
					doneName, parent, cache,
					count, diff,
					type = match[1],
					node = elem;
				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}
						if ( type === "first" ) {
							return true;
						}
						node = elem;
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}
						return true;
					case "nth":
						first = match[2];
						last = match[3];
						if ( first === 1 && last === 0 ) {
							return true;
						}
						doneName = match[0];
						parent = elem.parentNode;
						if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
							count = 0;
							for ( node = parent.firstChild; node; node = node.nextSibling ) {
								if ( node.nodeType === 1 ) {
									node.nodeIndex = ++count;
								}
							}
							parent[ expando ] = doneName;
						}
						diff = elem.nodeIndex - last;
						if ( first === 0 ) {
							return diff === 0;
						} else {
							return ( diff % first === 0 && diff / first >= 0 );
						}
				}
			},
			ID: function( elem, match ) {
				return elem.nodeType === 1 && elem.getAttribute("id") === match;
			},
			TAG: function( elem, match ) {
				return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
			},
			CLASS: function( elem, match ) {
				return (" " + (elem.className || elem.getAttribute("class")) + " ")
					.indexOf( match ) > -1;
			},
			ATTR: function( elem, match ) {
				var name = match[1],
					result = Sizzle.attr ?
						Sizzle.attr( elem, name ) :
						Expr.attrHandle[ name ] ?
						Expr.attrHandle[ name ]( elem ) :
						elem[ name ] != null ?
							elem[ name ] :
							elem.getAttribute( name ),
					value = result + "",
					type = match[2],
					check = match[4];
				return result == null ?
					type === "!=" :
					!type && Sizzle.attr ?
					result != null :
					type === "=" ?
					value === check :
					type === "*=" ?
					value.indexOf(check) >= 0 :
					type === "~=" ?
					(" " + value + " ").indexOf(check) >= 0 :
					!check ?
					value && result !== false :
					type === "!=" ?
					value !== check :
					type === "^=" ?
					value.indexOf(check) === 0 :
					type === "$=" ?
					value.substr(value.length - check.length) === check :
					type === "|=" ?
					value === check || value.substr(0, check.length + 1) === check + "-" :
					false;
			},
			POS: function( elem, match, i, array ) {
				var name = match[2],
					filter = Expr.setFilters[ name ];
				if ( filter ) {
					return filter( elem, i, match, array );
				}
			}
		}
	};
	var origPOS = Expr.match.POS,
		fescape = function(all, num){
			return "\\" + (num - 0 + 1);
		};
	for ( var type in Expr.match ) {
		Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
		Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
	}
	Expr.match.globalPOS = origPOS;
	var makeArray = function( array, results ) {
		array = Array.prototype.slice.call( array, 0 );
		if ( results ) {
			results.push.apply( results, array );
			return results;
		}
		return array;
	};
	try {
		Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;
	} catch( e ) {
		makeArray = function( array, results ) {
			var i = 0,
				ret = results || [];
			if ( toString.call(array) === "[object Array]" ) {
				Array.prototype.push.apply( ret, array );
			} else {
				if ( typeof array.length === "number" ) {
					for ( var l = array.length; i < l; i++ ) {
						ret.push( array[i] );
					}
				} else {
					for ( ; array[i]; i++ ) {
						ret.push( array[i] );
					}
				}
			}
			return ret;
		};
	}
	var sortOrder, siblingCheck;
	if ( document.documentElement.compareDocumentPosition ) {
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
			if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
				return a.compareDocumentPosition ? -1 : 1;
			}
			return a.compareDocumentPosition(b) & 4 ? -1 : 1;
		};
	} else {
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			} else if ( a.sourceIndex && b.sourceIndex ) {
				return a.sourceIndex - b.sourceIndex;
			}
			var al, bl,
				ap = [],
				bp = [],
				aup = a.parentNode,
				bup = b.parentNode,
				cur = aup;
			if ( aup === bup ) {
				return siblingCheck( a, b );
			} else if ( !aup ) {
				return -1;
			} else if ( !bup ) {
				return 1;
			}
			while ( cur ) {
				ap.unshift( cur );
				cur = cur.parentNode;
			}
			cur = bup;
			while ( cur ) {
				bp.unshift( cur );
				cur = cur.parentNode;
			}
			al = ap.length;
			bl = bp.length;
			for ( var i = 0; i < al && i < bl; i++ ) {
				if ( ap[i] !== bp[i] ) {
					return siblingCheck( ap[i], bp[i] );
				}
			}
			return i === al ?
				siblingCheck( a, bp[i], -1 ) :
				siblingCheck( ap[i], b, 1 );
		};
		siblingCheck = function( a, b, ret ) {
			if ( a === b ) {
				return ret;
			}
			var cur = a.nextSibling;
			while ( cur ) {
				if ( cur === b ) {
					return -1;
				}
				cur = cur.nextSibling;
			}
			return 1;
		};
	}
	(function(){
		var form = document.createElement("div"),
			id = "script" + (new Date()).getTime(),
			root = document.documentElement;
		form.innerHTML = "<a name='" + id + "'/>";
		root.insertBefore( form, root.firstChild );
		if ( document.getElementById( id ) ) {
			Expr.find.ID = function( match, context, isXML ) {
				if ( typeof context.getElementById !== "undefined" && !isXML ) {
					var m = context.getElementById(match[1]);
					return m ?
						m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
							[m] :
							undefined :
						[];
				}
			};
			Expr.filter.ID = function( elem, match ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return elem.nodeType === 1 && node && node.nodeValue === match;
			};
		}
		root.removeChild( form );
		root = form = null;
	})();
	(function(){
		var div = document.createElement("div");
		div.appendChild( document.createComment("") );
		if ( div.getElementsByTagName("*").length > 0 ) {
			Expr.find.TAG = function( match, context ) {
				var results = context.getElementsByTagName( match[1] );
				if ( match[1] === "*" ) {
					var tmp = [];
					for ( var i = 0; results[i]; i++ ) {
						if ( results[i].nodeType === 1 ) {
							tmp.push( results[i] );
						}
					}
					results = tmp;
				}
				return results;
			};
		}
		div.innerHTML = "<a href='#'></a>";
		if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
				div.firstChild.getAttribute("href") !== "#" ) {
			Expr.attrHandle.href = function( elem ) {
				return elem.getAttribute( "href", 2 );
			};
		}
		div = null;
	})();
	if ( document.querySelectorAll ) {
		(function(){
			var oldSizzle = Sizzle,
				div = document.createElement("div"),
				id = "__sizzle__";
			div.innerHTML = "<p class='TEST'></p>";
			if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
				return;
			}
			Sizzle = function( query, context, extra, seed ) {
				context = context || document;
				if ( !seed && !Sizzle.isXML(context) ) {
					var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
					if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
						if ( match[1] ) {
							return makeArray( context.getElementsByTagName( query ), extra );
						} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
							return makeArray( context.getElementsByClassName( match[2] ), extra );
						}
					}
					if ( context.nodeType === 9 ) {
						if ( query === "body" && context.body ) {
							return makeArray( [ context.body ], extra );
						} else if ( match && match[3] ) {
							var elem = context.getElementById( match[3] );
							if ( elem && elem.parentNode ) {
								if ( elem.id === match[3] ) {
									return makeArray( [ elem ], extra );
								}
							} else {
								return makeArray( [], extra );
							}
						}
						try {
							return makeArray( context.querySelectorAll(query), extra );
						} catch(qsaError) {}
					} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
						var oldContext = context,
							old = context.getAttribute( "id" ),
							nid = old || id,
							hasParent = context.parentNode,
							relativeHierarchySelector = /^\s*[+~]/.test( query );
						if ( !old ) {
							context.setAttribute( "id", nid );
						} else {
							nid = nid.replace( /'/g, "\\$&" );
						}
						if ( relativeHierarchySelector && hasParent ) {
							context = context.parentNode;
						}
						try {
							if ( !relativeHierarchySelector || hasParent ) {
								return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
							}
						} catch(pseudoError) {
						} finally {
							if ( !old ) {
								oldContext.removeAttribute( "id" );
							}
						}
					}
				}
				return oldSizzle(query, context, extra, seed);
			};
			for ( var prop in oldSizzle ) {
				Sizzle[ prop ] = oldSizzle[ prop ];
			}
			div = null;
		})();
	}
	(function(){
		var html = document.documentElement,
			matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
		if ( matches ) {
			var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
				pseudoWorks = false;
			try {
				matches.call( document.documentElement, "[test!='']:sizzle" );
			} catch( pseudoError ) {
				pseudoWorks = true;
			}
			Sizzle.matchesSelector = function( node, expr ) {
				expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
				if ( !Sizzle.isXML( node ) ) {
					try {
						if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
							var ret = matches.call( node, expr );
							if ( ret || !disconnectedMatch ||
									node.document && node.document.nodeType !== 11 ) {
								return ret;
							}
						}
					} catch(e) {}
				}
				return Sizzle(expr, null, null, [node]).length > 0;
			};
		}
	})();
	(function(){
		var div = document.createElement("div");
		div.innerHTML = "<div class='test e'></div><div class='test'></div>";
		if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
			return;
		}
		div.lastChild.className = "e";
		if ( div.getElementsByClassName("e").length === 1 ) {
			return;
		}
		Expr.order.splice(1, 0, "CLASS");
		Expr.find.CLASS = function( match, context, isXML ) {
			if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
				return context.getElementsByClassName(match[1]);
			}
		};
		div = null;
	})();
	function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
		for ( var i = 0, l = checkSet.length; i < l; i++ ) {
			var elem = checkSet[i];
			if ( elem ) {
				var match = false;
				elem = elem[dir];
				while ( elem ) {
					if ( elem[ expando ] === doneName ) {
						match = checkSet[elem.sizset];
						break;
					}
					if ( elem.nodeType === 1 && !isXML ){
						elem[ expando ] = doneName;
						elem.sizset = i;
					}
					if ( elem.nodeName.toLowerCase() === cur ) {
						match = elem;
						break;
					}
					elem = elem[dir];
				}
				checkSet[i] = match;
			}
		}
	}
	function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
		for ( var i = 0, l = checkSet.length; i < l; i++ ) {
			var elem = checkSet[i];
			if ( elem ) {
				var match = false;
				elem = elem[dir];
				while ( elem ) {
					if ( elem[ expando ] === doneName ) {
						match = checkSet[elem.sizset];
						break;
					}
					if ( elem.nodeType === 1 ) {
						if ( !isXML ) {
							elem[ expando ] = doneName;
							elem.sizset = i;
						}
						if ( typeof cur !== "string" ) {
							if ( elem === cur ) {
								match = true;
								break;
							}
						} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
							match = elem;
							break;
						}
					}
					elem = elem[dir];
				}
				checkSet[i] = match;
			}
		}
	}
	if ( document.documentElement.contains ) {
		Sizzle.contains = function( a, b ) {
			return a !== b && (a.contains ? a.contains(b) : true);
		};
	} else if ( document.documentElement.compareDocumentPosition ) {
		Sizzle.contains = function( a, b ) {
			return !!(a.compareDocumentPosition(b) & 16);
		};
	} else {
		Sizzle.contains = function() {
			return false;
		};
	}
	Sizzle.isXML = function( elem ) {
		var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	var posProcess = function( selector, context, seed ) {
		var match,
			tmpSet = [],
			later = "",
			root = context.nodeType ? [context] : context;
		while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
			later += match[0];
			selector = selector.replace( Expr.match.PSEUDO, "" );
		}
		selector = Expr.relative[selector] ? selector + "*" : selector;
		for ( var i = 0, l = root.length; i < l; i++ ) {
			Sizzle( selector, root[i], tmpSet, seed );
		}
		return Sizzle.filter( later, tmpSet );
	};
	window.Sizzle = Sizzle;
	})();
	Util.querySelector = u.qs = function(query, target) {
		var res = Sizzle(query, target);
		return res[0];
	}
	Util.querySelectorAll = u.qsa = function(query, target) {
		var res = Sizzle(query, target);
		return res;
	}
}

Util.explorer = function(version, scope) {
	if(document.all) {
		var undefined;
		var current_version = navigator.userAgent.match(/(MSIE )(\d+.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.safari = function(version, scope) {
	if(navigator.userAgent.indexOf("Safari") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(Safari\/)(\d+)(.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.webkit = function(version, scope) {
	if(navigator.userAgent.indexOf("AppleWebKit") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(AppleWebKit\/)(\d+.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.firefox = function(version, scope) {
	var browser = navigator.userAgent.match(/(Firefox\/)(\d+\.\d+)/i);
	if(browser) {
		var current_version = browser[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.opera = function() {
	return (navigator.userAgent.indexOf("Opera") >= 0) ? true : false;
}
Util.windows = function() {
	return (navigator.userAgent.indexOf("Windows") >= 0) ? true : false;
}
Util.osx = function() {
	return (navigator.userAgent.indexOf("OS X") >= 0) ? true : false;
}

Util.absoluteX = u.absX = function(e) {
	if(e.offsetParent) {
		return e.offsetLeft + u.absX(e.offsetParent);
	}
	return e.offsetLeft;
}
Util.absoluteY = u.absY = function(e) {
	if(e.offsetParent) {
		return e.offsetTop + u.absY(e.offsetParent);
	}
	return e.offsetTop;
}
Util.relativeX = u.relX = function(e) {
	if(u.gcs(e, "position").match(/absolute/) == null && e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absolute/) == null) {
		return e.offsetLeft + u.relX(e.offsetParent);
	}
	return e.offsetLeft;
}
Util.relativeY = u.relY = function(e) {
	if(u.gcs(e, "position").match(/relative|absolute/) == null && e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absolute/) == null) {
		return e.offsetTop + u.relY(e.offsetParent);
	}
	return e.offsetTop;
}
Util.relativeOffsetX = u.relOffsetX = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absX(e.offsetParent); // - e.offsetLeft u.relOffsetX(e.offsetParent);
	}
	return 0; //u.absX(e) - e.offsetLeft;
}
Util.relativeOffsetY = u.relOffsetY = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absY(e.offsetParent);
	}
	return 0; // u.absY(e) - e.offsetTop;
}
Util.actualWidth = function(e) {
	return parseInt(u.gcs(e, "width"));
}
Util.actualHeight = function(e) {
	return parseInt(u.gcs(e, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.documentElement.offsetWidth;
}
Util.htmlHeight = u.htmlH = function() {
	return document.documentElement.offsetHeight;
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}

if(window.pageXOffset == undefined && Object.defineProperty) {
	Object.defineProperty(window, "pageXOffset",
		{get: function() {
			return document.documentElement.scrollLeft;
			}
		}
	);
}
if(window.pageYOffset == undefined && Object.defineProperty) {
	Object.defineProperty(window, "pageYOffset",
		{get: function() {
			return document.documentElement.scrollTop;
			}
		}
	);
}

Util.saveCookie = function(name, value) {
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +";"
}
Util.savePermCookie = function(name, value) {
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +";expires=Mon, 04-Apr-2020 05:00:00 GMT;"
}
Util.getCookie = function(name) {
	var matches;
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.delCookie = function(name) {
	document.cookie = encodeURIComponent(name) + "=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}

Util.Hash = u.h = new function() {
	this.catchEvent = function(callback, node) {
		this.node = node;
		this.node.callback = callback;
		hashChanged = function(event) {
			u.h.node.callback();
		}
		if("onhashchange" in window && !u.explorer(7, "<=")) {
			window.onhashchange = hashChanged;
		}
		else {
			u.current_hash = window.location.hash;
			window.onhashchange = hashChanged;
			setInterval(
				function() {
					if(window.location.hash !== u.current_hash) {
						u.current_hash = window.location.hash;
						window.onhashchange();
					}
				}, 200
			);
		}
	}
	this.cleanHash = function(string, levels) {
		if(!levels) {
			return string.replace(location.protocol+"//"+document.domain, "");
		}
		else {
			var i, return_string = "";
			var hash = string.replace(location.protocol+"//"+document.domain, "").split("/");
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanUrl = function(string, levels) {
		string = string.split("#")[0].replace(location.protocol+"//"+document.domain, "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
	this.getCleanHash = function(string, levels) {
		string = string.replace("#", "");
		if(!levels) {
			return string;
		}
		else {
			var i, return_string = "";
			var hash = string.split("/");
			levels = levels > hash.length-1 ? hash.length-1 : levels;
			for(i = 1; i <= levels; i++) {
				return_string += "/" + hash[i];
			}
			return return_string;
		}
	}
}

Util.link = function(e) {
	var a = (e.nodeName.toLowerCase() == "a" ? e : u.qs("a", e));
	u.addClass(e, "link");
	e.url = a.href;
	a.removeAttribute("href");
	u.e.click(e);
}

Util.date = function(format, timestamp, months) {
	var date = timestamp ? new Date(timestamp) : new Date();
	if(isNaN(date.getTime())) {
		if(!timestamp.match(/[A-Z]{3}\+[0-9]{4}/)) {
			if(timestamp.match(/ \+[0-9]{4}/)) {
				date = new Date(timestamp.replace(/ (\+[0-9]{4})/, " GMT$1"));
			}
		}
		if(isNaN(date.getTime())) {
			date = new Date();
		}
	}
	var tokens = /d|j|m|n|F|Y|G|H|i|s/g;
	var chars = new Object();
	chars.j = date.getDate();
	chars.d = (chars.j > 9 ? "" : "0") + chars.j;
	chars.n = date.getMonth()+1;
	chars.m = (chars.n > 9 ? "" : "0") + chars.n;
	chars.F = months ? months[date.getMonth()] : "";
	chars.Y = date.getFullYear();
	chars.G = date.getHours();
	chars.H = (chars.G > 9 ? "" : "0") + chars.G;
	var i = date.getMinutes();
	chars.i = (i > 9 ? "" : "0") + i;
	var s = date.getSeconds();
	chars.s = (s > 9 ? "" : "0") + s;
	return format.replace(tokens, function (_) {
		return _ in chars ? chars[_] : _.slice(1, _.length - 1);
	});
};

Util.flash = function(e, url, id, w, h, background) {
	w = w ? w : e.offsetWidth;
	h = h ? h : e.offsetHeight;
	background = background ? background : "transparent";
	id = id ? id : "flash_" + new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getMilliseconds();
	html = '<object';
	html += ' id="'+id+'"';
	html += ' width="'+w+'"';
	html += ' height="'+h+'"';
	if(u.explorer()) {
		html += ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
	}
	else {
		html += ' type="application/x-shockwave-flash"';
		html += ' data="'+url+'"';
	}
	html += '>';
	html += '<param name="allowScriptAccess" value="always" />';
	html += '<param name="movie" value="'+url+'" />';
	html += '<param name="quality" value="high" />';
	html += '<param name="bgcolor" value="'+background+'" />';
	html += '<param name="play" value="true" />';
	html += '<param name="wmode" value="transparent" />';
	html += '<param name="menu" value="false" />';
	html += '<param name="scale" value="showall" />';
	html += '</object>';
	var temp_node = document.createElement("div");
	temp_node.innerHTML += html;
	e.insertBefore(temp_node.firstChild, e.firstChild);
	var obj = u.qs("#"+id, e);
	return obj;
}

Util.Timer = u.t = new function() {
	this.actions = new Array();
	this.objects = new Array();
	this.timers = new Array();
	this.setTimer = function(object, action, timeout) {
		var id = this.actions.length;
		this.actions[id] = action;
		this.objects[id] = object;
		this.timers[id] = setTimeout("u.t.executeTimer("+id+")", timeout);
		return id;
	}
	this.resetTimer = function(id) {
		clearTimeout(this.timers[id]);
		this.objects[id] = false;
	}
	this.executeTimer = function(id) {
		this.objects[id].exe = this.actions[id];
		this.objects[id].exe();
		this.objects[id].exe = null;
		this.actions[id] = null;
		this.objects[id] = false;
		this.timers[id] = null;
	}
	this.setInterval = function(object, action, timeout) {
		var id = this.actions.length;
		this.actions[id] = action;
		this.objects[id] = object;
		this.timers[id] = setInterval("u.t.executeInterval("+id+")", timeout);
		return id;
	}
	this.resetInterval = function(id) {
		clearInterval(this.timers[id]);
		this.objects[id] = false;
	}
	this.executeInterval = function(id) {
		this.objects[id].exe = this.actions[id];
		this.objects[id].exe();
	}
	this.valid = function(id) {
		return this.objects[id] ? true : false;
	}
}

Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" ? "mouse" : "touch";
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation()
		}
	}
	this.addEvent = function(e, type, action) {
		try {
			e.addEventListener(type, action, false);
		}
		catch(exception) {
			alert("exception in addEvent:" + e + "," + type + ":" + exception);
		}
	}
	this.removeEvent = function(e, type, action) {
		try {
			e.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.bug("exception in removeEvent:" + e + "," + type + ":" + exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.removeStartEvent = this.removeDownEvent = function(e, action) {
		u.e.removeEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.addMoveEvent = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.removeMoveEvent = function(e, action) {
		u.e.removeEvent(e, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.addEndEvent = this.addUpEvent = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(e.snapback && u.e.event_pref == "mouse") {
			u.e.addEvent(e, "mouseout", this._snapback);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(e, action) {
		u.e.removeEvent(e, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(e.snapback && u.e.event_pref == "mouse") {
			u.e.removeEvent(e, "mouseout", this._snapback);
		}
	}
	this.overlap = function(element, target, strict) {
		if(target.constructor.toString().match("Array")) {
			var target_start_x = Number(target[0]);
			var target_start_y = Number(target[1]);
			var target_end_x = Number(target[2]);
			var target_end_y = Number(target[3]);
		}
		else {
			var target_start_x = target.element_x ? target.element_x : 0;
			var target_start_y = target.element_y ? target.element_y : 0;
			var target_end_x = Number(target_start_x + target.offsetWidth);
			var target_end_y = Number(target_start_y + target.offsetHeight);
		}
		var element_start_x = Number(element.element_x);
		var element_start_y = Number(element.element_y);
		var element_end_x = Number(element_start_x + element.offsetWidth);
		var element_end_y = Number(element_start_y + element.offsetHeight);
		if(strict && element_start_x >= target_start_x && element_start_y >= target_start_y && element_end_x <= target_end_x && element_end_y <= target_end_y) {
			return true;
		}
		else if(strict) {
			return false;
		}
		else if(element_end_x < target_start_x || element_start_x > target_end_x || element_end_y < target_start_y || element_start_y > target_end_y) {
			return false;
		}
		return true;
	}
	this.resetClickEvents = function(e) {
		u.t.resetTimer(e.t_held);
		u.t.resetTimer(e.t_clicked);
		this.removeEvent(e, "mouseup", this._dblclicked);
		this.removeEvent(e, "touchend", this._dblclicked);
		this.removeEvent(e, "mousemove", this._clickCancel);
		this.removeEvent(e, "touchmove", this._clickCancel);
		this.removeEvent(e, "mousemove", this._move);
		this.removeEvent(e, "touchmove", this._move);
	}
	this.resetDragEvents = function(e) {
		this.removeEvent(e, "mousemove", this._pick);
		this.removeEvent(e, "touchmove", this._pick);
		this.removeEvent(e, "mousemove", this._drag);
		this.removeEvent(e, "touchmove", this._drag);
		this.removeEvent(e, "mouseup", this._drop);
		this.removeEvent(e, "touchend", this._drop);
		this.removeEvent(e, "mouseout", this._snapback);
		this.removeEvent(e, "mouseout", this._drop);
		this.removeEvent(e, "mousemove", this._scrollStart);
		this.removeEvent(e, "touchmove", this._scrollStart);
		this.removeEvent(e, "mousemove", this._scrolling);
		this.removeEvent(e, "touchmove", this._scrolling);
		this.removeEvent(e, "mouseup", this._scrollEnd);
		this.removeEvent(e, "touchend", this._scrollEnd);
	}
	this.resetEvents = function(e) {
		this.resetClickEvents(e);
		this.resetDragEvents(e);
	}
	this.resetNestedEvents = function(e) {
		while(e && e.nodeName != "HTML") {
			this.resetEvents(e);
			e = e.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = new Date().getTime();
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			var node = this;
			while(node) {
				if(node.e_drag || node.e_swipe) {
					u.e.addMoveEvent(this, u.e._clickCancel);
					break;
				}
				else {
					node = node.parentNode;
				}
			}
			u.e.addMoveEvent(this, u.e._move);
			u.e.addEndEvent(this, u.e._dblclicked);
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.addMoveEvent(this, u.e._pick);
			u.e.addEndEvent(this, u.e._drop);
		}
		if(this.e_scroll) {
			u.e.addMoveEvent(this, u.e._scrollStart);
			u.e.addEndEvent(this, u.e._scrollEnd);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		u.e.resetClickEvents(this);
		if(typeof(this.clickCancelled) == "function") {
			this.clickCancelled(event);
		}
	}
	this._move = function(event) {
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this.hold = function(e) {
		e.e_hold = true;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._held = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(e) {
		e.e_click = true;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._clicked = function(event) {
		u.stats.event(this, "clicked");
		u.e.resetNestedEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(e) {
		e.e_dblclick = true;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			u.e.resetNestedEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(!event) {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.drag = function(e, target, strict, snapback) {
		e.e_drag = true;
		e.strict = strict ? true : false;
		e.allowed_offset = e.strict ? 0 : 250;
		e.elastica = 2;
		e.snapback = snapback ? true : false;
		if(target.constructor.toString().match("Array")) {
			e.start_drag_x = Number(target[0]);
			e.start_drag_y = Number(target[1]);
			e.end_drag_x = Number(target[2]);
			e.end_drag_y = Number(target[3]);
		}
		else {
			e.start_drag_x = target.element_x ? target.element_x : 0;
			e.start_drag_y = target.element_y ? target.element_y : 0;
			e.end_drag_x = Number(e.start_drag_x + target.offsetWidth);
			e.end_drag_y = Number(e.start_drag_y + target.offsetHeight);
		}
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		e.locked = ((e.end_drag_x - e.start_drag_x == e.offsetWidth) && (e.end_drag_y - e.start_drag_y == e.offsetHeight));
		e.vertical = (!e.locked && e.end_drag_x - e.start_drag_x == e.offsetWidth);
		e.horisontal = (!e.locked && e.end_drag_y - e.start_drag_y == e.offsetHeight);
		u.e.addStartEvent(e, this._inputStart);
	}
	this._pick = function(event) {
		var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
		var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
		u.e.resetNestedEvents(this);
		if(init_speed_x > init_speed_y && this.horisontal || init_speed_x < init_speed_y && this.vertical || !this.vertical && !this.horisontal) {
		    u.e.kill(event);
			this.move_timestamp = new Date().getTime();
			this.current_xps = 0;
			this.current_yps = 0;
			this.start_input_x = u.eventX(event) - this.element_x; // - u.absLeft(this);//(event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
			this.start_input_y = u.eventY(event) - this.element_y; // - u.absTop(this);//.targetTouches ? event.targetTouches[0].pageY : event.pageY);
			u.a.transition(this, "none");
			if(typeof(this.picked) == "function") {
				this.picked(event);
			}
			u.e.addMoveEvent(this, u.e._drag);
			u.e.addEndEvent(this, u.e._drop);
		}
	}
	this._drag = function(event) {
			this.new_move_timestamp = new Date().getTime();
				var offset = false;
				this.current_x = u.eventX(event) - this.start_input_x;
				this.current_y = u.eventY(event) - this.start_input_y;
					this.current_xps = Math.round(((this.current_x - this.element_x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
					this.current_yps = Math.round(((this.current_y - this.element_y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
				this.move_timestamp = this.new_move_timestamp;
				if(this.vertical) {
					this.element_y = this.current_y;
				}
				else if(this.horisontal) {
					this.element_x = this.current_x;
				}
				else if(!this.locked) {
					this.element_x = this.current_x;
					this.element_y = this.current_y;
				}
				if(!this.locked) {
					if(u.e.overlap(this, new Array(this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y), true)) {
						if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.horisontal)) {
							if(this.current_xps < 0) {
								this.swiped = "left";
							}
							else {
								this.swiped = "right";
							}
						}
						else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.vertical)) {
							if(this.current_yps < 0) {
								this.swiped = "up";
							}
							else {
								this.swiped = "down";
							}
						}
						u.a.translate(this, this.element_x, this.element_y);
					}
					else {
						this.swiped = false;
						this.current_xps = 0;
						this.current_yps = 0;
						if(this.element_x < this.start_drag_x && !this.vertical) {
							offset = this.element_x < this.start_drag_x - this.allowed_offset ? - this.allowed_offset : this.element_x - this.start_drag_x;
							this.element_x = this.start_drag_x;
							this.current_x = this.element_x + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_x + this.offsetWidth > this.end_drag_x && !this.vertical) {
							offset = this.element_x + this.offsetWidth > this.end_drag_x + this.allowed_offset ? this.allowed_offset : this.element_x + this.offsetWidth - this.end_drag_x;
							this.element_x = this.end_drag_x - this.offsetWidth;
							this.current_x = this.element_x + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_x = this.element_x;
						}
						if(this.element_y < this.start_drag_y && !this.horisontal) {
							offset = this.element_y < this.start_drag_y - this.allowed_offset ? - this.allowed_offset : this.element_y - this.start_drag_y;
							this.element_y = this.start_drag_y;
							this.current_y = this.element_y + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_y + this.offsetHeight > this.end_drag_y && !this.horisontal) {
							offset = (this.element_y + this.offsetHeight > this.end_drag_y + this.allowed_offset) ? this.allowed_offset : (this.element_y + this.offsetHeight - this.end_drag_y);
							this.element_y = this.end_drag_y - this.offsetHeight;
							this.current_y = this.element_y + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_y = this.element_y;
						}
						if(offset) {
							u.a.translate(this, this.current_x, this.current_y);
						}
					}
				}
			if(typeof(this.moved) == "function") {
				this.moved(event);
			}
	}
	this._drop = function(event) {
		u.e.resetEvents(this);
		if(this.e_swipe && this.swiped) {
			if(this.swiped == "left") {
				if(typeof(this.swipedLeft) == "function") {
					this.swipedLeft(event);
				}
			}
			else if(this.swiped == "right") {
				if(typeof(this.swipedRight) == "function") {
					this.swipedRight(event);
				}
			}
			else if(this.swiped == "down") {
				if(typeof(this.swipedDown) == "function") {
					this.swipedDown(event);
				}
			}
			else if(this.swiped == "up") {
				if(typeof(this.swipedUp) == "function") {
					this.swipedUp(event);
				}
			}
		}
		else if(!this.locked && this.start_input_x && this.start_input_y) {
			this.start_input_x = false;
			this.start_input_y = false;
			this.current_x = this.element_x + (this.current_xps/2);
			this.current_y = this.element_y + (this.current_yps/2);
			if(this.current_x < this.start_drag_x) {
				this.current_x = this.start_drag_x;
			}
			else if(this.current_x + this.offsetWidth > this.end_drag_x) {
				this.current_x = this.end_drag_x - this.offsetWidth;
			}
			if(this.current_y < this.start_drag_y) {
				this.current_y = this.start_drag_y;
			}
			else if(this.current_y + this.offsetHeight > this.end_drag_y) {
				this.current_y = this.end_drag_y - this.offsetHeight;
			}
			if(!this.strict && (this.current_xps || this.current_yps)) {
				u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
			}
			else {
				u.a.transition(this, "all 0.1s cubic-bezier(0,0,0.25,1)");
			}
			u.a.translate(this, this.current_x, this.current_y);
		}
		if(typeof(this.dropped) == "function") {
			this.dropped(event);
		}
	}
	this.swipe = function(e, target, strict) {
		e.e_swipe = true;
		u.e.drag(e, target, strict);
	}
	this._swipe = function(event) {
	}
	this.scroll = function(e) {
		e.e_scroll = true;
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		u.e.addStartEvent(e, this._inputStart);
	}
	this._scrollStart = function(event) {
		u.e.resetNestedEvents(this);
		this.move_timestamp = new Date().getTime();
		this.current_xps = 0;
		this.current_yps = 0;
		this.start_input_x = u.eventX(event) - this.element_x;
		this.start_input_y = u.eventY(event) - this.element_y;
		u.a.transition(this, "none");
		if(typeof(this.picked) == "function") {
			this.picked(event);
		}
		u.e.addMoveEvent(this, u.e._scrolling);
		u.e.addEndEvent(this, u.e._scrollEnd);
	}
	this._scrolling = function(event) {
		this.new_move_timestamp = new Date().getTime();
		this.current_x = u.eventX(event) - this.start_input_x;
		this.current_y = u.eventY(event) - this.start_input_y;
		this.current_xps = Math.round(((this.current_x - this.element_x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
		this.current_yps = Math.round(((this.current_y - this.element_y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
		this.move_timestamp = this.new_move_timestamp;
		if(u.scrollY() > 0 && -(this.current_y) + u.scrollY() > 0) {
			u.e.kill(event);
			window.scrollTo(0, -(this.current_y) + u.scrollY());
		}
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this._scrollEnd = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.dropped) == "function") {
			this.dropped(event);
		}
	}
	this._snapback = function(event) {
	    u.e.kill(event);
		u.bug(2, "snap")
		if(this.start_input_x && this.start_input_y) {
			input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
			input_y = event.targetTouches ? event.targetTouches[0].pageY : event.pageY;
			offset_x = 0;
			offset_y = 0;
			if(this.vertical) {
				offset_y = input_y - this.current_y;
			}
			else if(this.horisontal) {
				offset_x = input_x - this.current_x;
			}
			else {
				offset_x = input_x - this.current_x;
				offset_y = input_y - this.current_y;
			}
			u.a.translate(this, (this.element_x+offset_x), (this.element_y+offset_y));
		}
	}
}

if(document.all) {
	window.attachedEvents = new Array();
	window.eventHandler = function() {
		var element, eid, i;
		element = window.event.srcElement;
		while(element && element.nodeName != "HTML") {
			eid = u.getIJ(element, "eid");
			if(eid && window.attachedEvents[eid] && window.attachedEvents[eid][window.event.type]) {
				var i, attachedAction;
				for(i = 0; attachedAction = window.attachedEvents[eid][window.event.type][i]; i++) {
					window.event.target = element;
					element.ie_event_action = attachedAction;
					element.ie_event_action(window.event);
				}
				return;
			}
			element = element.parentNode;
		}
		if(window.attachedEvents["window"] && window.attachedEvents["window"][window.event.type]) {
			var i, attachedAction;
			for(i = 0; attachedAction = window.attachedEvents["window"][window.event.type][i]; i++) {
				window.event.target = window;
				window.ie_event_action = attachedAction;
				window.ie_event_action(window.event);
			}
			return;
		}
	}
	u.e.event_pref = "mouse";
	u.e.kill = function(event) {
		if(event) {
			event.cancelBubble = true;
			event.returnValue = false;
		}
	}
	u.e.addEvent = function(e, type, action) {
		if(e != window) {
			var eid = u.getIJ(e, "eid");
			if(!eid) {
				var eid = u.randomKey();
				u.ac(e, "eid:"+eid)
			}
		}
		else {
			eid = "window";
		}
		if(!window.attachedEvents[eid]) {
			window.attachedEvents[eid] = new Array();
		}
		if(!window.attachedEvents[eid][type]) {
			window.attachedEvents[eid][type] = new Array();
		}
		if(window.attachedEvents[eid][type].indexOf(action) == -1) {
			window.attachedEvents[eid][type][window.attachedEvents[eid][type].length] = action;
		}
		e.attachEvent("on"+type, window.eventHandler);
	}
	u.e.removeEvent = function(e, type, action) {
		if(e != window) {
			var eid = u.getIJ(e, "eid");
		}
		else {
			eid = "window";
		}
		if(eid) {
			if(window.attachedEvents[eid] && window.attachedEvents[eid][type]) {
				for(i in window.attachedEvents[eid][type]) {
					if(window.attachedEvents[eid][type][i] == action) {
						window.attachedEvents[eid][type].splice(i,1);
					}
				}
			}
		}
		e.detachEvent("on"+type, window.eventHandler);
	}
}

Util.Image = u.i = new function() {
	this.load = function(e, src) {
		var image = new Image();
		image.e = e;
		u.addClass(e, "loading");
	    u.e.addEvent(image, 'load', u.i._loaded);
		image.src = src;
	}
	this._loaded = function(event) {
		u.removeClass(this.e, "loading");
		if(typeof(this.e.loaded) == "function") {
			this.e.loaded(event);
		}
	}
	this._progress = function(event) {
		u.bug("progress")
		if(typeof(this.e.progress) == "function") {
			this.e.progress(event);
		}
	}
	this._debug = function(event) {
		u.bug("event:" + event.type);
	}
}

u.i.load = function(e, src) {
	var image = new Image();
	image.e = e;
	u.addClass(e, "loading");
	image.onload = function() {
		var event = new Object();
		event.target = this;
		u.removeClass(this.e, "loading");
		if(typeof(this.e.loaded) == "function") {
			this.e.loaded(event);
		}
	}
	image.src = src;
}

Util.Animation = u.a = new function() {
	this.support = function() {
		var node = document.createElement("div");
		if(node.style[this.variant() + "Transition"] !== undefined) {
			return true;
		}
		return false;
	}
	this.variant = function(e) {
		if(this.implementation == undefined) {
			if(document.body.style.webkitTransition != undefined) {
				this.implementation = "webkit";
			}
			else if(document.body.style.MozTransition != undefined) {
				this.implementation = "Moz";
			}
			else if(document.body.style.oTransition != undefined) {
				this.implementation = "o";
			}
			else {
				this.implementation = "";
			}
		}
		return this.implementation;
	}
	this.translate = function(e, x, y) {
		var variant_string = this.variant();
		if(variant_string == "webkit") {
			e.style[variant_string + "Transform"] = "translate3d("+x+"px, "+y+"px, 0)";
		}
		else {
			e.style[variant_string + "Transform"] = "translate("+x+"px, "+y+"px)";
		}
		e.element_x = x;
		e.element_y = y;
		e._x = x;
		e._y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotate = function(e, deg) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg)";
		e._rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.scale = function(e, scale) {
		e.style[this.variant() + "Transform"] = "scale("+scale+")";
		e.scale = scale;
		e._scale = scale;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.setOpacity = function(e, opacity) {
		e.style.opacity = opacity;
		e._opacity = opacity;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.setWidth = function(e, width) {
		var width_px = (width == "auto" ? width : (width.toString().match(/\%/) ? width : width+"px"));
		e.style.width = width_px;
		e._width = width;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.setHeight = function(e, height) {
		var height_px = (height == "auto" ? height : (height.toString().match(/\%/) ? height : height+"px"));
		e.style.height = height_px;
		e._height = height;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotateTranslate = function(e, deg, x, y) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg) translate("+x+"px, "+y+"px)";
		e.rotation = deg;
		e.element_x = x;
		e.element_y = y;
		e._rotation = deg;
		e._x = x;
		e._y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.translateRotate = function(e, x, y, deg) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px) rotate("+deg+"deg)";
		e.element_x = x;
		e.element_y = y;
		e.rotation = deg;
		e._x = x;
		e._y = y;
		e._rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.transition = function(e, transition) {
		try {
			e.style[this.variant() + "Transition"] = transition;
			u.e.addEvent(e, this.variant() + "TransitionEnd", this._transitioned);
			u.e.addEvent(e, "transitionend", this._transitioned);
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				var d = duration[0];
				e.duration = d.match("ms") ? parseFloat(d) : (parseFloat(d) * 1000);
			}
			else {
				e.duration = false;
			}
			e.offsetHeight;
		}
		catch(exception) {
			u.bug("Exception ("+exception+") in u.a.transition, called from: "+arguments.callee.caller);
		}
	}
	this._transitioned = function(event) {
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
		}
	}
	this.fadeIn = function(e, duration) {
		duration = duration == undefined ? "0.5s" : duration;
		u.as(e, "opacity", 0);
		if(u.gcs(e, "display") == "none") {
			u.as(e, "display", "block");
		}
		u.a.transition(e, "all "+duration+" ease-in");
		u.as(e, "opacity", 1);
	}
}

this.transition = function(e, transition) {
	var duration = transition.match(/[0-9.]+[ms]+/g);
	if(duration) {
		var d = duration[0];
		e.duration = d.match("ms") ? parseFloat(d) : (parseFloat(d) * 1000);
	}
	else {
		e.duration = false;
	}
	e.offsetHeight;
}
u.a.setOpacity = function(e, opacity) {
	if(e.duration && !this.support()) {
		e.o_start = e._opacity ? e._opacity : u.gcs(e, "opacity");
		e.o_transitions = e.duration/50;
		e.o_change = (opacity - e.o_start) / e.o_transitions;
		e.o_progress = 0;
		e.o_transitionTo = function() {
			++this.o_progress;
			var new_opacity = (Number(this.o_start) + Number(this.o_progress * this.o_change));
			u.as(this, "opacity", new_opacity);
			this.style.filter='progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (new_opacity*100) + ')';
		}
		for(var i = 0; i < e.o_transitions; i++) {
			u.t.setTimer(e, e.o_transitionTo, 50 * i);
		}
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}
	}
	else {
		e.style.opacity = opacity;
		e.style.filter='progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (opacity*100) + ')';
	}
	e._opacity = opacity;
	e.transition_timestamp = new Date().getTime();
	e.offsetHeight;
}
u.a.setWidth = function(e, width) {
	if(e.duration && !this.support()) {
		e.w_start = e._width ? e._width : u.gcs(e, "width").replace("px", "");
		e.w_transitions = e.duration/50;
		e.w_change = (width - e.w_start) / e.w_transitions;
		e.w_progress = 0;
		e.w_transitionTo = function() {
			++this.w_progress;
			var new_width = (Number(this.w_start) + Number(this.w_progress * this.w_change));
			u.as(this, "width", new_width+"px");
		}
		for(var i = 0; i < e.w_transitions; i++) {
			u.t.setTimer(e, e.w_transitionTo, 50 * i);
		}
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}
	}
	else {
		var width_px = (width == "auto" ? width : width+"px");
		u.as(e, "width", width_px);
	}
	e._width = width;
	e.transition_timestamp = new Date().getTime();
	e.offsetHeight;
}
u.a.setHeight = function(e, height) {
	if(e.duration && !this.support()) {
		e.h_start = e._height ? e._height : u.gcs(e, "height").replace("px", "");
		e.h_transitions = e.duration/50;
		e.h_change = (height - e.h_start) / e.h_transitions;
		e.h_progress = 0;
		e.h_transitionTo = function() {
			++this.h_progress;
			var new_height = (Number(this.h_start) + Number(this.h_progress * this.h_change));
			u.as(this, "height", new_height+"px");
		}
		for(var i = 0; i < e.h_transitions; i++) {
			u.t.setTimer(e, e.h_transitionTo, 50 * i);
		}
		if(typeof(e.transitioned) == "function") {
			u.t.setTimer(e, e.transitioned, e.duration);
		}
	}
	else {
		var height_px = (height == "auto" ? height : height+"px");
		u.as(e, "height", height_px);
	}
	e._height = height;
	e.transition_timestamp = new Date().getTime();
	e.offsetHeight;
}
u.a.translate = function(e, x, y) {
	var i;
	if(e.translate_offset_x == undefined) {
		e.translate_offset_x = u.relX(e);
		e.translate_offset_y = u.relY(e);
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		if(this.support()) {
			e.style[this.variant()+"Transition"] = "none";
		}
		u.as(e, "left", e.translate_offset_x+"px");
		u.as(e, "top", e.translate_offset_y+"px");
		u.as(e, "position", "absolute");
	}
	if(e.duration) {
		e.x_start = e.element_x;
		e.y_start = e.element_y;
		e.translate_transitions = e.duration/25;
		e.translate_progress = 0;
		e.x_change = (x - e.x_start) / e.translate_transitions;
		e.y_change = (y - e.y_start) / e.translate_transitions;
		e.translate_transitionTo = function(event) {
			++this.translate_progress;
			var new_x = (Number(this.x_start) + Number(this.translate_progress * this.x_change) + this.translate_offset_x);
			var new_y = (Number(this.y_start) + Number(this.translate_progress * this.y_change) + this.translate_offset_y);
			u.as(e, "left", new_x + "px");
			u.as(e, "top", new_y + "px");
			if(this.translate_progress < this.translate_transitions) {
				this.t_transition = u.t.setTimer(this, this.translate_transitionTo, 25);
			}
			else {
				if(typeof(this.transitioned) == "function") {
					this.transitioned(event);
				}
			}
		}
		e.translate_transitionTo();
	}
	else {
		u.as(e, "left", (e.translate_offset_x + x)+"px");
		u.as(e, "top", (e.translate_offset_y + y)+"px");
	}
	e.element_x = x;
	e.element_y = y;
	e.transition_timestamp = new Date().getTime();
	e.offsetHeight;
}
u.a._callback = function(event) {
	if(typeof(this.transitioned) == "function") {
		this.transitioned(event);
	}
}

Util.createRequestObject = function(type) {
	var request_object = false;
		try {
			request_object = new XMLHttpRequest();
		}
		catch(e){
			request_object = new ActiveXObject("Microsoft.XMLHTTP");
		}
	if(request_object) {
		return request_object;
	}
	u.bug("Could not create HTTP Object");
	return false;
}
Util.Request = function(node, url, parameters, method, async) {
	if(typeof(node) != "object") {
		var node = new Object();
	}
	node.url = url;
	node.parameters = parameters ? parameters : "";
	node.method = method ? method : "GET";
	node.async = async ? async : false;
	if(node.method.match(/GET|POST|PUT|PATCH/i)) {
		node.HTTPRequest = this.createRequestObject();
		node.HTTPRequest.node = node;
		if(node.async) {
			node.HTTPRequest.onreadystatechange = function() {
				if(node.HTTPRequest.readyState == 4) {
					u.validateResponse(this);
				}
			}
		}
		try {
			if(node.method.match(/GET/i)) {
				node.url += node.parameters ? ((!node.url.match(/\?/g) ? "?" : "&") + node.parameters) : "";
				node.HTTPRequest.open(node.method, node.url, node.async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node.HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				node.HTTPRequest.send();
			}
			else if(node.method.match(/POST|PUT|PATCH/i)) {
				node.HTTPRequest.open(node.method, node.url, node.async);
				node.HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node.HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				node.HTTPRequest.send(node.parameters);
			}
		}
		catch(e) {
			u.bug("request exception:" + e);
			u.validateResponse(node.HTTPRequest);
			return;
		}
		if(!async) {
			u.validateResponse(node.HTTPRequest);
		}
	}
	else if(node.method.match(/SCRIPT/i)) {
		node.url = url;
		var key = u.randomString();
		document[key] = new Object();
		document[key].node = node;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.responseText = response;
			u.validateResponse(response_object);
		}
		u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node.url + "?" + parameters + "&callback=document."+key+".responder"}));
	}
}
Util.requestParameters = function() {
	u.bug("params:" + arguments.length)
}
Util.testResponseForJSON = function(responseText) {
	if(responseText.trim().substr(0, 1).match(/[\{\[]/i) && responseText.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = eval("("+responseText+")");
			if(typeof(test) == "object") {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.testResponseForHTML = function(responseText) {
	if(responseText.trim().substr(0, 1).match(/[\<]/i) && responseText.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = responseText;
			if(test.childNodes.length) {
				var body_class = responseText.match(/<body class="([a-z0-9A-Z_ ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = responseText.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.evaluateResponse = function(responseText) {
	var object;
	if(typeof(responseText) == "object") {
		responseText.isJSON = true;
		return responseText;
	}
	else {
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
				response_string = responseText.trim();
				var json = u.testResponseForJSON(response_string.substr(1, response_string.length-2));
				if(json) {
					return json;
				}
				var html = u.testResponseForHTML(response_string.substr(1, response_string.length-2));
				if(html) {
					return html;
				}
				return responseText;
		}
		var json = u.testResponseForJSON(responseText);
		if(json) {
			return json;
		}
		var html = u.testResponseForHTML(responseText);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(response){
	var object;
	if(response) {
		try {
			if(response.status) {
				if(!response.status.toString().match(/403|404|500/)) {
					object = u.evaluateResponse(response.responseText);
				}
			}
			else {
				if(response.responseText) {
					object = u.evaluateResponse(response.responseText);
				}
			}
		}
		catch(exception) {
			u.bug("HTTPRequest exection:" + e);
		}
	}
	if(typeof(response.node.Response) == "function") {
		response.node.Response(object);
	}
}

Util.Objects = u.o = new Object();
Util.init = function(scope) {
	var i, e, elements, ij_value;
	scope = scope && scope.nodeName ? scope : document;
	elements = u.ges("i\:([_a-zA-Z0-9])+", scope);
	for(i = 0; e = elements[i]; i++) {
		while((ij_value = u.getIJ(e, "i"))) {
			u.removeClass(e, "i:"+ij_value);
			if(ij_value && typeof(u.o[ij_value]) == "object") {
				u.o[ij_value].init(e);
			}
		}
	}
}

u.txt = new Object({
	"readmore":"Læs mere",
	"minimize":"Minimér",
	"overview":"Overblik",
	"next":"Næste",
	"previous":"Forrige",
	"type_client":"Indtast kunde eller projektnavn",
	"search":"Søg",
	"months": new Array("januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december")
});
Util.articleSnippet = function(article) {
	if(article.textContent != undefined && article.textContent.length > 200) {
		article.preview = u.previewNode(article, 200);
		var readmore = u.ae(article.preview.lastChild, "a", "readmore")
		readmore.innerHTML = u.txt["readmore"]; //"Læs mere";
		var minimize = u.ae(u.ae(article, "div", "minimize"), "a", "minimize")
		minimize.innerHTML = u.txt["minimize"]; //"Minimér";
		article.max_height = article.offsetHeight;
		article.original = article.cloneNode(true);
		article.innerHTML = article.preview.innerHTML;
		u.ac(article, "force-dom-update");
		u.rc(article, "force-dom-update");
		article.min_height = article.offsetHeight;
		u.a.setHeight(article, article.min_height);
		article.showOriginal = function() {
			this.transitioned = function() {
				this.transitioned = null;
				u.a.transition(this, "none");
				this.innerHTML = this.original.innerHTML;
				var minimize = u.qs(".minimize", this);
				minimize.article = this;
				u.e.click(minimize);
				minimize.clicked = function(event) {
					u.e.kill(event);
					this.article.showPreview();
				}
				this.transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.a.transition(this, "all 0.5s ease-in");
					u.a.setHeight(this, this.max_height);
				}
				u.a.transition(this, "all 0.3s ease-in");
				u.a.setOpacity(this, 1);
			}
			if(u.gcs(this, "opacity") == 0) {
				this.transitioned();
			}
			else {
				u.a.transition(this, "all 0.3s ease-in");
				u.a.setOpacity(this, 0);
			}
		}
		article.showPreview = function() {
			this.transitioned = function() {
				this.transitioned = null;
				u.a.transition(this, "none");
				this.innerHTML = this.preview.innerHTML;
				var readmore = u.qs(".readmore", this);
				readmore.article = this;
				u.e.click(readmore);
				readmore.clicked = function(event) {
					u.e.kill(event);
					this.article.showOriginal();
				}
				this.transitioned = function() {
					this.transitioned = null;
					u.a.transition(this, "none");
					u.a.transition(this, "all 0.3s ease-in");
					u.a.setOpacity(this, 1);
				}
				u.a.transition(this, "all 0.3s ease-in");
				if(this.offsetHeight == this.min_height) {
					this.transitioned();
				}
				u.a.setHeight(this, this.min_height);
			}
			if(u.gcs(this, "opacity") == 0) {
				this.transitioned();
			}
			else {
				u.a.transition(this, "all 0.3s ease-in");
				u.a.setOpacity(this, 0);
			}
		}
		article.showPreview();
	}
}
u.previewNode = function(node, max_length) {
	var preview_node = node.cloneNode(true);
	this.text_length = 0;
	this.max_length = max_length;
	this.childIterator = function(parent) {
		var i, child;
		for(i = 0; child = parent.childNodes[i]; i++) {
			if(this.text_length < this.max_length) {
				if(child.nodeName == "#text") {
					if(child.data.trim()) {
						if(this.text_length + child.data.length > this.max_length) {
							child.data = child.data.substring(0, this.max_length - this.text_length) + " ...";
							this.text_length = this.max_length;
						}
						else {
							this.text_length += child.data.length;
						}
					}
					else {
						child.parentNode.removeChild(child);
						i--;
					}
				}
				else {
					this.childIterator(child);
				}
			}
			else {
				child.parentNode.removeChild(child);
				i--;
			}
		}
		return;
	}
	this.childIterator(preview_node);
	return preview_node;
}
Util.videoPlayer = function() {
	var player = document.createElement("div");
	u.ac(player, "player");
	player.video = u.ae(player, "video");
	player.video.player = player;
	if(typeof(player.video.play) == "function" && !u.explorer()) {
		player.load = function(src) {
			this.setup();
			if(this.className.match("/playing/")) {
				this.stop();
			}
			if(src) {
				this.video.src = this.correctSource(src);
				this.video.load();
				this.video.controls = false;
			}
		}
		player.play = function(position) {
			position = position == undefined ? false : position;
			if(this.video.currentTime && position !== false) {
				this.video.currentTime = position;
			}
			if(this.video.src) {
				this.video.play();
			}
		}
		player.loadAndPlay = function(src, position) {
			this.load(src);
			this.play(position);
		}
		player.pause = function() {
			this.video.pause();
		}
		player.stop = function() {
			this.video.pause();
			if(this.video.currentTime) {
				this.video.currentTime = 0;
			}
		}
		player.togglePlay = function() {
			if(this.className.match(/playing/g)) {
				this.pause();
			}
			else {
				this.play();
			}
		}
		player.setup = function() {
			if(u.qs("video", this)) {
				this.removeChild(this.video);
			}
			this.video = u.ie(this, "video");
			this.video.player = this;
			this._loadstart = function(event) {
				u.ac(this.player, "loading");
			}
			u.e.addEvent(this.video, "loadstart", this._loadstart);
			this._canplaythrough = function(event) {
				u.rc(this.player, "loading");
			}
			u.e.addEvent(this.video, "canplaythrough", this._canplaythrough);
			this._playing = function(event) {
				u.rc(this.player, "loading");
				u.ac(this.player, "playing");
			}
			u.e.addEvent(this.video, "playing", this._playing);
			this._paused = function(event) {
				u.rc(this.player, "playing");
			}
			u.e.addEvent(this.video, "pause", this._paused);
			this._stalled = function(event) {
				u.rc(this.player, "playing");
				u.ac(this.player, "loading");
			}
			u.e.addEvent(this.video, "stalled", this._paused);
			this._ended = function(event) {
				u.rc(this.player, "playing");
			}
			u.e.addEvent(this.video, "ended", this._ended);
		}
		player.eject = function() {
			if(this.parentNode) {
				if(u.qs("video", this)) {
					this.removeChild(this.video);
				}
				this.parentNode.removeChild(this);
			}
		}
	}
	else if(document.all || (navigator.plugins && navigator.mimeTypes["application/x-shockwave-flash"])) {
		player.removeChild(player.video);
		if(!player.id) {
			var id = u.randomString();
			player.id = id;
		}
		player.flash = true;
		player.load = function(src) {
			if(!this.ready) {
				this.setup();
			}
			if(this.ready) {
				if(this.className.match("/playing/")) {
					this.stop();
				}
				if(src) {
					this.video.loadVideo(this.correctSource(src));
				}
			}
			else {
				this.queue(this.load, src);
			}
		}
		player.play = function(position) {
			if(this.ready) {
				this.video.playVideo();
			}
			else {
				this.queue(this.play, position);
			}
		}
		player.loadAndPlay = function(src) {
				this.load(src);
				this.play(0);
		}
		player.pause = function() {
			if(this.ready) {
				this.video.pauseVideo();
			}
			else {
				this.queue(this.pause);
			}
		}
		player.stop = function() {
			if(this.ready) {
			}
			else {
				this.queue(this.stop);
			}
		}
		player.togglePlay = function() {
			if(this.ready) {
				if(this.className.match(/playing/g)) {
					this.pause();
				}
				else {
					this.play();
				}
			}
			else {
				this.queue(this.togglePlay);
			}
		}
		player.setup = function() {
			if(u.qs("object", this)) {
				this.removeChild(this.video);
			}
			this.ready = false;
			this.video = u.flash(this, "/media/flash/videoplayer.swf?id="+this.id, false, "100%", "100%");
		}
		player.queue = function(action) {
			if(!this.actionsQueue) {
				this.actionsQueue = new Array();
				this.paramsQueue = new Array();
			}
			this.actionsQueue[this.actionsQueue.length] = action;
			var params = false;
			if(arguments.length > 1) {
				params = arguments[1];
			}
			this.paramsQueue[this.paramsQueue.length] = params;
			this.hasQueue = true;
		}
		player.eject = function() {
			this.ready = false;
			if(this.parentNode) {
				this.parentNode.removeChild(this);
			}
		}
		u.flashVideoPlayer = new Object();
		u.flashVideoPlayer.ready = function(id, check) {
			var player = document.getElementById(id);
			player.ready = true;
			if(player.hasQueue) {
				player.hasQueue = false;
				var i, action;
				for(i = 0; action = player.actionsQueue[i]; i++) {
					player._action = action;
					if(player.paramsQueue[0]) {
						player._action(player.paramsQueue[0]);
					}
					else {
						player._action();
					}
				}
				player.actionsQueue = null;
			}
		}
		u.flashVideoPlayer.ended = function(id) {
			u.rc(document.getElementById(id), "playing");
		}
		u.flashVideoPlayer.paused = function(id) {
			u.rc(document.getElementById(id), "playing");
		}
		u.flashVideoPlayer.loadstart = function(id) {
			u.ac(document.getElementById(id), "loading");
		}
		u.flashVideoPlayer.playing = function(id) {
			u.rc(document.getElementById(id), "loading");
			u.ac(document.getElementById(id), "playing");
		}
		u.flashVideoPlayer.canplaythrough = function(id) {
			u.rc(document.getElementById(id), "loading");
		}
	}
	else {
		player.innerHTML = "<p>no HTML5 or flash</p>";
	}
	player.correctSource = function(src) {
		src = src.replace(/\.m4v|\.mp4|\.webm|\.ogv|\.3gp|\.mov/, "");
		if(this.flash) {
			return src+".mp4";
		}
		else if(this.video.canPlayType("video/mp4")) {
			return src+".mp4";
		}
		else if(this.video.canPlayType("video/ogg")) {
			return src+".ogv";
		}
		else if(this.video.canPlayType("video/3gpp")) {
			return src+".3gp";
		}
		else {
			return src+".mov";
		}
	}
	player.controls = u.ae(player, "div", "controls");
	var playpause = u.ae(player.controls, "a", "playpause");
	playpause.player = player;
	player.controls.playpause = playpause;
	u.e.click(playpause);
	playpause.clicked = function(event) {
		this.player.togglePlay();
	}
	player.hideControls = function() {
		this.t_controls = u.t.resetTimer(this.t_controls);
		u.a.transition(this.controls, "all 0.3s ease-out");
		u.a.setOpacity(this.controls, 0);
	}
	player.showControls = function() {
		if(this.t_controls) {
			this.t_controls = u.t.resetTimer(this.t_controls);
		}
		else {
			u.a.transition(this.controls, "all 0.5s ease-out");
			u.a.setOpacity(this.controls, 1);
		}
		this.t_controls = u.t.setTimer(this, this.hideControls, 1500);
	}
	u.e.addEvent(player, "mousemove", player.showControls);
	return player;
}
Util.Objects["page"] = new function() {
	this.init = function(e) {
		var i, node;
		u.removeClass(e, "i:page");
		var errorSwitch = function() {
		}
		var safetySwitch = function() {
			document.body.className += " loading";
		}
		document.t_safety = u.t.setTimer(document, safetySwitch, 5000);
		e.hN = u.qs("#header", e);
		e.hN.page = e;
		e.cN = u.qs("#content", e);
		e.cN.page = e;
		u.as(e.cN, "opacity", "0");
		u.a.transition(e.cN, "opacity 0.5s ease-in");
		e.nN = u.qs("#navigation", e);
		if(e.nN) {
			e.nN = e.insertBefore(e.nN, e.cN);
			e.nN.page = e;
			e.nN.ul = u.qs("ul", e.nN);
			var h3 = u.ae(u.ie(e.nN.ul, "li", ({"class":"front"})), "h3");
			h3.appendChild(u.qs(".servicenavigation .front a"), e.hN);
		}
		e.fN = u.qs("#footer", e);
		e.fN.page = e;
		e.home = u.qs("h1", e.hN);
		e.home.url = u.qs(".front a", e.nN).href;
		e.home.clicked = function(event) {
			location.href = this.url;
		}
		u.e.click(e.home);
		var corp = u.qs(".corpnavigation", e.fN);
		if(corp) {
			e.hN.insertBefore(corp, e.home);
		}
		var languages = u.qs(".languages", e.hN);
		if(languages) {
			e.nN.appendChild(languages);
		}
		e.search = u.ae(e.nN, "div", "search");
		e.search.e = e;
		e.search.url = u.qs(".servicenavigation .search a").href;
		e.search.Response = function(response) {
			this.form = this.appendChild(u.qs("#content form.search", response));
			this.form.onsubmit = function() {return false;}
			this.input = u.qs("input.search", this);
			this.input.e = this;
			this.input.onfocus = function() {
				this.focused = true;
				u.ac(this.e, "focus");
			}
			this.input.onblur = function() {
				this.focused = false;
				u.rc(this.e, "focus");
			}
			this.onmouseover = function() {
				u.ac(this, "focus");
			}
			this.onmouseout = function() {
				if(!this.input.focused) {
					u.rc(this, "focus");
				}
			}
			this.onkeydown = function(event) {
				if(event.keyCode == 13) {
					u.e.kill(event);
					if(this.input.value) {
						location.hash = u.h.cleanHash(this.form.action + "/" + this.input.value);
					}
					else {
						this.input.focus();
					}
				}
			}
			var button = u.qs(".submit", this);
			button.e = this;
			u.e.click(button);
			button.clicked = function(event) {
				u.e.kill(event);
				if(this.e.input.value) {
					location.hash = u.h.cleanHash(this.e.form.action + "/" + this.e.input.value);
				}
				else {
					this.e.input.focus();
				}
				return false;
			}
		}
		u.Request(e.search, e.search.url);
		e.hN.removeChild(u.qs(".servicenavigation", e.hN));
		e.fN.removeChild(u.qs(".servicenavigation", e.fN));
		var navNodes = u.qsa("li", e.nN);
		for(i = 0; navNode = navNodes[i]; i++) {
			u.link(navNode);
			navNode.clicked = function(event) {
				location.hash = u.h.cleanHash(this.url);
			}
		}
		e.ready = function() {
			u.t.resetTimer(document.t_error);
			u.h.catchEvent(this.cN.navigate, this.cN);
			this.transitioned = function() {
				this.transitioned = null;
				u.addClass(this, "ready");
				this.cN.ready();
			}
			u.a.transition(this, "all 1.5s ease-in");
			u.a.setOpacity(this, 1);
		}
		e.cN.ready = function() {
			if(this.page.className.match(/ready/) && this.className.match(/ready/)) {
				u.rc(document.body, "loading");
				u.t.resetTimer(document.t_safety);
				u.a.transition(this, "opacity 0.5s ease-in");
				u.a.setOpacity(this, 1);
			}
		}
		e.cN.navigate = function() {
			window.onscroll = null;
			if(this.current_base_url != u.h.getCleanHash(location.hash, 1) || u.h.getCleanHash(location.hash, 1) == u.h.getCleanHash(location.hash)) {
				this.Response = function(response) {
					u.stats.pageView(this.url);
					u.setClass(document.body, response.body_class);
					this.innerHTML = u.qs("#content", response).innerHTML;
					document.title = response.head_title;
					u.init(this);
				}
				this.transitioned = function(event) {
					this.transitioned = null;
					u.a.transition(this, "none");
					this.current_base_url = u.h.getCleanHash(location.hash, 1);
					u.Request(this, u.h.getCleanHash(location.hash, 1));
				}
				u.rc(this, "ready");
				if(u.gcs(this, "opacity") == 0) {
					this.transitioned();
				}
				else {
					u.a.setOpacity(this, 0);
				}
			}
			else {
				if(this.scene && this.scene.parentNode && typeof(this.scene.navigate) == "function") {
					this.scene.navigate();
				}
			}
		}
		if(location.hash.length < 2) {
			location.hash = u.h.getCleanUrl(location.href);
			u.init(e.cN);
		}
		else if(u.h.getCleanHash(location.hash) != u.h.getCleanUrl(location.href)) {
			e.cN.navigate();
		}
		else {
			u.init(e.cN);
		}
		u.t.setTimer(e, e.ready, 50);
	}
}
window.onload = function() {u.o.page.init(u.qs("#page"));}

Util.Objects["content"] = new function() {
	this.init = function(e) {
		var page = u.qs("#page");
		e.ready = function() {
				u.ac(u.qs("#content"), "ready");
				u.qs("#content").ready();
		}
		e.ready();
	}
}

Util.Objects["front"] = new function() {
	this.init = function(e) {
		var page = u.qs("#page");
		e.ready = function() {
			if(this.initialized) {
				return;
			}
			else {
				u.ac(u.qs("#content"), "ready");
				u.qs("#content").ready();
				this.initialized = true;
			}
		}
		e.extendNode = function(node) {
			if(!node.initialized) {
				node.initialized = true;
				node.Response = function(response) {
					var article_node, i;
					this.innerHTML = u.qs("#maincontent", response).innerHTML;
					var originsite = u.qs(".info .originsite", this);
					if(originsite) {
						this.insertBefore(originsite, u.qs("h2", this));
					}
					u.articleSnippet(u.qs(".article", this));
					this.ready = function() {
						this.transitioned = function() {
							this.transitioned = null;
							u.a.transition(this, "none");
							var next = u.ns(this);
							if(next && this.offsetTop < u.scrollY() + u.browserH()) {
								this.e.extendNode(next);
							}
							else if(!next) {
								this.e.lowest = this.offsetTop + this.offsetHeight;
								this.e.done = true;
								this.e.ready();
							}
							else {
								this.e.lowest = this.offsetTop + this.offsetHeight;
								this.e.ready();
							}
						}
						u.a.transition(this, "all 0.2s ease-in");
						u.a.setOpacity(this, 1);
					}
					this.subReady = function() {
						if(u.qsa(".ready", this.node).length == this.node.subs.length) {
							this.node.ready();
						}
					}
					this.subs = u.ges("i\:([_a-zA-Z0-9])+", this);
					if(this.subs.length) {
						for(i = 0; sub = this.subs[i]; i++) {
							sub.node = node;
							sub.ready = this.subReady;
						}
						u.init(this);
					}
					else {
						this.ready();
					}
				}
				node.transitioned = function() {
					u.Request(this, this.url);
				}
				u.a.transition(node, "all 0.5s ease-in");
				u.a.setOpacity(node, 0);
			}
			else {
				var next = u.ns(node);
				if(next && node.offsetTop < u.scrollY() + u.browserH()) {
					this.extendNode(next);
				}
				else if(!next) {
					this.lowest = node.offsetTop + node.offsetHeight;
					this.done = true;
					this.ready();
				}
				else {
					this.lowest = node.offsetTop + node.offsetHeight;
					this.ready();
				}
			}
		}
		e.nodes = u.qsa(".list li", e);
		if(e.nodes.length) {
			for(i = 0; node = e.nodes[i]; i++) {
				node.e = e;
				node.i = i;
				u.link(node);
			}
			e.extendNode(e.nodes[0]);
			window.onscroll = function() {
				var mc = u.qs("#maincontent");
				if(!mc.done && mc.lowest < u.scrollY() + u.browserH()) {
					mc.extendNode(mc.nodes[0]);
				}
			}
		}
		else {
			e.ready();
		}
	}
}

Util.Objects["about"] = new function() {
	this.init = function(e) {
		var page = u.qs("#page");
		e.ready = function() {
			if(!this.initialized) {
				u.ac(u.qs("#content"), "ready");
				u.qs("#content").ready();
				this.initialized = true;
			}
		}
		e.ready();
	}
}
Util.Objects["jobs"] = new function() {
	this.init = function(e) {
		var node, i;
		var page = u.qs("#page");
		e.ready = function() {
			if(!this.initialized) {
				u.ac(u.qs("#content"), "ready");
				u.qs("#content").ready();
				this.initialized = true;
			}
		}
		var nodes = u.qsa("ul.jobs li", e);
		for(i = 0; node = nodes[i]; i++) {
			u.link(node);
			node.Response = function(response) {
				this.innerHTML = u.qs("#maincontent", response).innerHTML;
				var originsite = u.qs(".info .originsite", this);
				if(originsite) {
					this.insertBefore(originsite, u.qs("h2", this));
				}
				u.articleSnippet(u.qs(".article", this));
				u.init(this);
			}
			u.Request(node, node.url);
		}
		e.ready();
	}
}
Util.Objects["people"] = new function() {
	this.init = function(e) {
		var node, i;
		var page = u.qs("#page");
		e.ready = function() {
			if(!this.initialized) {
				u.ac(u.qs("#content"), "ready");
				u.qs("#content").ready();
				this.initialized = true;
			}
		}
		var nodes = u.qsa("ul.people li", e);
		for(i = 0; node = nodes[i]; i++) {
			node.e = e;
			u.link(node);
			node.show = function() {
				this.t_hide = u.t.resetTimer(this.t_hide);
				this.tools_ul.transitioned = null;
				u.a.transition(this.image, "all 0.3s ease-out");
				u.a.setOpacity(this.image, 0.18);
				u.a.setOpacity(this.tools_ul, 1);
				u.a.transition(this.tools_ul, "all 0.7s cubic-bezier(.24,1,.15,.91)");
				u.a.translate(this.tools_ul, 0, 0);
				u.a.setOpacity(this.email, 1);
				u.a.transition(this.email, "all 0.7s cubic-bezier(.24,1,.15,.91)");
				u.a.translate(this.email, 0, 0);
				u.a.setOpacity(this.tel, 1);
				u.a.transition(this.tel, "all 0.7s cubic-bezier(.24,1,.15,.91)");
				u.a.translate(this.tel, 0, 0);
			}
			node.considerHiding = function() {
				u.t.resetTimer(this.t_hide);
				this.t_hide = u.t.setTimer(this, this.hide, 200);
			}
			node.hide = function() {
				this.tools_ul.transitioned = function(event) {
					u.a.transition(this.node.tools_ul, "none");
					u.a.translate(this.node.tools_ul, this.node.tools_ul.offsetWidth, 0);
					u.a.transition(this.node.email, "none");
					u.a.translate(this.node.email, -this.node.offsetWidth, 0);
					u.a.transition(this.node.tel, "none");
					u.a.translate(this.node.tel, -this.node.offsetWidth, 0);
				}
				u.a.transition(this.tools_ul, "all 0.2s ease-in");
				u.a.transition(this.email, "all 0.2s ease-in");
				u.a.transition(this.tel, "all 0.2s ease-in");
				if(u.gcs(this.tools_ul, "opacity") == 0) {
					this.tools_ul.transitioned();
				}
				else {
					u.a.setOpacity(this.tools_ul, 0);
					u.a.setOpacity(this.email, 0);
					u.a.setOpacity(this.tel, 0);
				}
				u.a.transition(this.image, "all 0.3s ease-in");
				u.a.setOpacity(this.image, 1);
			}
			node.Response = function(response) {
				var i, tool;
				this.innerHTML = u.qs("#maincontent", response).innerHTML;
				u.init(this);
				this.image = u.qs(".image", this);
				this.tools_ul = u.qs(".tools", this);
				this.tools_ul.node = this;
				u.a.setOpacity(this.tools_ul, 0);
				u.as(this.tools_ul, "display", "block");
				u.a.setWidth(this.tools_ul, this.tools_ul.offsetWidth);
				u.a.translate(this.tools_ul, this.tools_ul.offsetWidth, 0);
				this.tools = u.qsa("li", this.tools_ul);
				for(i = 0; tool = this.tools[i]; i++) {
					u.link(tool);
					tool.clicked = function(event) {
						u.e.kill(event);
						window.open(this.url, "_blank");
					}
				}
				this.email = u.qs(".email", this);
				u.a.setOpacity(this.email, 0);
				u.as(this.email, "display", "block");
				u.a.translate(this.email, -this.offsetWidth, 0);
				u.link(this.email);
				this.email.clicked = function(event) {
					u.e.kill(event);
					location.href = this.url;
				}
				this.tel = u.qs(".tel", this);
				u.a.setOpacity(this.tel, 0);
				u.as(this.tel, "display", "block");
				u.a.translate(this.tel, -this.offsetWidth, 0);
				u.link(this.tel);
				this.tel.clicked = function(event) {
					u.e.kill(event);
					location.href = this.url;
				}
				if(u.e.event_pref == "mouse") {
					this.onmouseover = this.show;
					this.onmouseout = this.considerHiding;
				}
				this.clicked = function() {
					u.tc(this, "show");
					if(this.className.match(/show/)) {
						this.hide();
					}
					else {
						this.show();
					}
				}
				u.e.click(this);
			}
			u.Request(node, node.url);
		}
		e.ready();
	}
}
Util.Objects["cases"] = new function() {
	this.init = function(e) {
		var i, node;
		var page = u.qs("#page");
		e.ready = function() {
			u.ac(u.qs("#content"), "ready");
			u.qs("#content").ready();
		}
		e.scene = u.ae(e, "div", "scene");
		e.scene.e = e;
		page.cN.scene = e.scene;
		e.scene.view = u.ae(e.scene, "div", "view");
		e.scene.view.scene = e.scene;
		e.scene.pagination = u.ae(e.scene, "div", "pagination");
		e.scene.pagination.scene = e.scene;
		e.scene.list = e.scene.appendChild(u.qs("ul.cases", e));
		var search_form = u.ie(e, "div", "search");
		var label = u.ae(search_form, "label", ({"for":"search_input"}));
		label.innerHTML = u.txt["search"] + ":";
		e.search = u.ae(search_form, "input", ({"type":"text", "id":"search_input"}));
		e.search.scene = e.scene;
		e.search.default_value = u.txt["type_client"]; //"Indtast kunde eller projektnavn";
		e.search.value = e.search.default_value;
		if(e.search) {
			e.search.onfocus = function() {
				if(this.value == this.default_value) {
					this.value = "";
				}
			}
			e.search.onblur = function() {
				if(this.value == "") {
					this.value = this.default_value;
				}
			}
		}
		e.search.updateList = function() {
			var i, node;
			for(i = 0; node = this.scene.nodes[i]; i++) {
				if(node.textContent.match(this.value)) {
					this.showNode(node);
				}
				else {
					this.hideNode(node);
				}
			}
		}
		e.search.showNode = function(node) {
			if(!node.show) {
				node.show = true;
				u.rc(node, "disabled");
				u.a.transition(node, "none");
				node.transitioned = null;
				u.as(node, "display", "block");
				u.a.transition(node, "all 0.3s ease-out");
				u.a.setOpacity(node, 1);
			}
		}
		e.search.hideNode = function(node) {
			if(node.show) {
				node.show = false;
				u.ac(node, "disabled");
				u.a.transition(node, "none");
				node.transitioned = function(event) {
					u.as(node, "display", "none");
				}
				if(u.gcs(node, "opacity") == 0) {
					node.transitioned();
				}
				else {
					u.a.transition(node, "all 0.5s ease-out");
					u.a.setOpacity(node, 0);
				}
			}
		}
		e.search.onkeyup = function(event) {
			u.t.resetTimer(this.t_search);
			this.t_search = u.t.setTimer(e.search, e.search.updateList, 200);
		}
		e.scene.navigate = function() {
			if(this.selected_case) {
				u.rc(this.selected_case, "selected");
				this.selected_case = false;
			}
			if(u.h.getCleanHash(location.hash, 1) != u.h.getCleanHash(location.hash, 2)) {
				var i, node;
				for(i = 0; node = this.nodes[i]; i++) {
					if(u.h.getCleanUrl(node.url) == u.h.getCleanHash(location.hash, 2)) {
						this.selected_case = node;
						break;
					}
				}
				if(this.className.match(/detail/g)) {
					this.view.transitioned = function(event) {
						u.a.transition(this, "none");
						this.transitioned = null;
						u.ac(this.scene, "detail");
						u.rc(this.scene, "overview");
						this.innerHTML = this.scene.selected_case.innerHTML;
						u.init(this);
						u.a.transition(this, "all 0.5s ease-in");
						u.a.setOpacity(this, 1);
					}
					if(u.gcs(this.view, "opacity") != 0) {
						u.a.transition(this.view, "all 0.5s ease-out");
						u.a.setOpacity(this.view, 0);
					}
					else {
						this.view.transitioned();
					}
				}
				else {
					this.transitioned = function(event) {
						u.a.transition(this, "none");
						this.transitioned = null;
						u.ac(this, "detail");
						u.rc(this, "overview");
						this.view.innerHTML = this.selected_case.innerHTML;
						u.init(this.view);
						u.a.transition(this, "all 0.5s ease-out");
						u.a.setOpacity(this, 1);
					}
					if(u.gcs(this, "opacity") != 0) {
						u.a.transition(this, "all 0.5s ease-out");
						u.a.setOpacity(this, 0);
					}
					else {
						this.transitioned();
					}
				}
			}
			else {
				this.transitioned = function(event) {
					u.a.transition(this, "none");
					this.transitioned = null;
					u.rc(this, "detail");
					u.ac(this, "overview");
					u.a.transition(this, "all 0.5s ease-out");
					u.a.setOpacity(this, 1);
				}
				if(u.gcs(this, "opacity") != 0) {
					u.a.transition(this, "all 0.5s ease-out");
					u.a.setOpacity(this, 0);
				}
				else {
					this.transitioned();
				}
			}
			this.pagination.updateButtons();
			this.e.ready();
		}
		e.scene.pagination.bn_prev = u.ae(e.scene.pagination, "div", "prev");
		e.scene.pagination.bn_prev.scene = e.scene;
		e.scene.pagination.bn_prev.innerHTML = u.txt["previous"]; //"Forrige";
		u.e.click(e.scene.pagination.bn_prev);
		e.scene.pagination.bn_prev.clicked = function(event) {
			if(this.scene.selected_case) {
				var prev = u.ps(this.scene.selected_case, "disabled");
				if(prev) {
					location.hash = u.h.getCleanUrl(prev.url);
				}
			}
		}
		e.scene.pagination.bn_next = u.ae(e.scene.pagination, "div", "next");
		e.scene.pagination.bn_next.scene = e.scene;
		e.scene.pagination.bn_next.innerHTML = u.txt["next"]; //"Næste";
		u.e.click(e.scene.pagination.bn_next);
		e.scene.pagination.bn_next.clicked = function(event) {
			if(this.scene.selected_case) {
				var next = u.ns(this.scene.selected_case, "disabled");
				if(next) {
					location.hash = u.h.getCleanUrl(next.url);
				}
			}
		}
		e.scene.pagination.bn_back = u.ae(e.scene.pagination, "div", "back");
		e.scene.pagination.bn_back.scene = e.scene;
		e.scene.pagination.bn_back.innerHTML = u.txt["overview"]; //"Overblik";
		u.e.click(e.scene.pagination.bn_back);
		e.scene.pagination.bn_back.clicked = function(event) {
			location.hash = u.h.getCleanHash(location.hash, 1);
		}
		e.scene.pagination.updateButtons = function() {
			if(this.scene.selected_case) {
				var prev = u.ps(this.scene.selected_case, "disabled");
				if(prev) {
					u.rc(this.bn_prev, "disabled");
				}
				else {
					u.ac(this.bn_prev, "disabled");
				}
				var next = u.ns(this.scene.selected_case, "disabled");
				if(next) {
					u.rc(this.bn_next, "disabled");
				}
				else {
					u.ac(this.bn_next, "disabled");
				}
			}
		}
		e.scene.nodes = u.qsa("li", e.scene.list);
		for(i = 0; node = e.scene.nodes[i]; i++) {
			node.scene = e.scene;
			u.link(node);
			node.show = function() {
				this.t_hide = u.t.resetTimer(this.t_hide);
				this.watch.transitioned = null;
				u.a.transition(this.image, "all 0.3s ease-out");
				u.a.setOpacity(this.image, 0.18);
				u.a.setOpacity(this.watch, 1);
				u.a.transition(this.watch, "all 0.7s cubic-bezier(.24,1,.15,.91)");
				u.a.translate(this.watch, 0, 0);
			}
			node.considerHiding = function() {
				u.t.resetTimer(this.t_hide);
				this.t_hide = u.t.setTimer(this, this.hide, 200);
			}
			node.hide = function() {
				this.watch.transitioned = function(event) {
					u.a.transition(this, "none");
					u.a.translate(this, 0, 100);
				}
				if(u.gcs(this.watch, "opacity") == 0) {
					this.watch.transitioned();
				}
				else {
					u.a.transition(this.watch, "all 0.2s ease-in");
					u.a.setOpacity(this.watch, 0);
				}
				u.a.transition(this.image, "all 0.3s ease-in");
				u.a.setOpacity(this.image, 1);
			}
			node.Response = function(response) {
				this.search_string = "";
				this.innerHTML = u.qs("#maincontent", response).innerHTML;
				this.image = u.qs(".thumbnail", this);
				u.a.setOpacity(this.image, 0);
				this.image.loaded = function() {
					u.a.transition(this, "all 0.5s ease-in");
					u.a.setOpacity(this, 1);
				}
				u.i.load(this.image, this.image.src);
				var h2 = u.qs("h2", this);
				var h2_text = h2.innerHTML;
				h2.innerHTML = "";
				var header = u.ae(h2, "div", "header");
				header.innerHTML = h2_text;
				var client = u.qs(".info .client", this);
				if(client) {
					h2.insertBefore(client, header);
					this.search_string += client.innerHTML + " ";
				}
				this.search_string += header.innerHTML;
				if(u.e.event_pref == "mouse") {
					this.onmouseover = this.show;
					this.onmouseout = this.considerHiding;
					this.watch = u.ae(u.qs(".thumb", this), "div", "watch");
					u.a.setOpacity(this.watch, 0);
					u.as(this.watch, "display", "block");
					u.a.translate(this.watch, 0, 30);
				}
			}
			u.Request(node, node.url);
			node.clicked = function(event) {
				location.hash = u.h.getCleanUrl(this.url);
			}
		}
		e.scene.navigate();
	}
}

Util.Objects["contact"] = new function() {
	this.init = function(e) {
		var page = u.qs("#page");
		e.ready = function() {
			if(!this.initialized) {
				u.ac(u.qs("#content"), "ready");
				u.qs("#content").ready();
				this.initialized = true;
			}
		}
		var latlng = new google.maps.LatLng(55.679368, 12.563136);
		var myOptions = {
			zoom: 15,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR  
			}
		};
		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		var marker = new google.maps.Marker({
			position: latlng, 
			map: map, 
			title:"Vester Farimagsgade 41"
		});
		e.ready();
	}
}
Util.Objects["search"] = new function() {
	this.init = function(e) {
		var page = u.qs("#page");
		e.ready = function() {
			if(!this.initialized) {
				u.ac(u.qs("#content"), "ready");
				u.qs("#content").ready();
				this.initialized = true;
			}
		}
		var nodes = u.qsa("li .readmore", e);
		for(i = 0; node = nodes[i]; i++) {
			node.url = node.href;
			node.removeAttribute("href");
			u.e.click(node);
			node.clicked = function(event) {
				location.hash = u.h.cleanHash(this.url);
			}
		}
		e.ready();
	}
}
Util.Objects["imagelist"] = new function() {
	this.init = function(list) {
		var i, node;
		var page = u.qs("#page");
		list.carousel = list.cloneNode(true);
		u.sc(list.carousel, "imagecarousel");
		var carousel = u.ie(list.parentNode, "div", "carousel");
		list.carousel = carousel.appendChild(list.carousel);
		list.carousel.list = list;
		list.carousel.node_width = list.carousel.offsetWidth;
		list.carousel.hideControls = function() {
			this.t_hint = u.t.resetTimer(this.t_hint);
			u.a.transition(this.controls, "all 0.3s ease-out");
			u.a.setOpacity(this.controls, 0);
		}
		list.carousel.showControls = function() {
			if(this.t_hint) {
				this.t_hint = u.t.resetTimer(this.t_hint);
			}
			else {
				u.a.transition(this.controls, "all 0.5s ease-out");
				u.a.setOpacity(this.controls, 0.5);
			}
			this.t_hint = u.t.setTimer(this, this.hideControls, 1500);
		}
		list.carousel._focusControls = function() {
			this.list.carousel.t_hint = u.t.resetTimer(this.list.carousel.t_hint);
			u.a.transition(this.list.carousel.controls, "all 0.1s ease-out");
			u.a.setOpacity(this.list.carousel.controls, 1);
		}
		list.loadImage = function(image_index) {
			if(image_index >= 0 && image_index < this.carousel.nodes.length) {
				var node = this.carousel.nodes[image_index];
				if(node && !node.initialized) {
					node.initialized = true;
					node.loaded = function(event) {
						u.as(this, "backgroundImage", "url("+event.target.src+")");
						this.list.imageLoaded(this);
					}
					u.i.load(node, Peoplegroup.assets_image_path() + "/" + node.item_id + "/" + node.list.carousel.node_width + "_width." + u.getIJ(node, "format"));
				}
				else {
					this.imageLoaded(node);
				}
			}
		}
		list.imageLoaded = function(node) {
			if(node.i == this.current_image) {
				if(typeof(this.ready) == "function" && !this.className.match("ready")) {
					u.ac(this, "ready");
					this.ready();
				}
				this.loadImage(this.current_image+1);
				this.loadImage(this.current_image-1);
			}
		}
		list.selectImage = function(index, hidden) {
			if(index >= 0 && index < this.carousel.nodes.length) {
				var page = u.qs("#page");
				if(page.player) {
					page.player.eject();
				}
				for(i = 0; node = this.nodes[i]; i++) {
					u.rc(node, "selected");
				}
				var current_node = this.nodes[index];
				u.ac(current_node, "selected");
				if(this.carousel.controls.prev && this.carousel.controls.prev.parentNode) {
					this.carousel.controls.prev.style.display = "block";
					this.carousel.controls.next.style.display = "block";
					if(index == 0) {
						this.carousel.controls.prev.style.display = "none";
					}
					else if(index ==this.carousel.nodes.length-1) {
						this.carousel.controls.next.style.display = "none";
					}
				}
				this.current_image = current_node.i;
				this.loadImage(this.current_image);
				if(hidden) {
					u.a.transition(this.carousel, "none");
				}
				else if(this.carousel.current_xps) {
					var duration = this.carousel.current_xps ? ((960 / Math.abs(this.carousel.current_xps)) * 0.7) : 0.7;
					duration = duration > 0.7 ? 0.7 : duration;
					u.a.transition(this.carousel, "all "+duration+"s ease-out");
				}
				else {
					u.a.transition(this.carousel, "all 0.7s ease-in-out");
				}
				u.a.translate(this.carousel, -(index*this.carousel.node_width), 0);
			}
		}
		list.carousel.fullScreen = function(index) {
			var page = u.qs("#page");
			if(page.player) {
				page.player.eject();
			}
			page.scrolled_to = u.scrollY();
			u.ac(document.body, "fullscreen");
			page.fullscreen = u.ae(document.body, "div", ({"id":"fullscreen"}));
			page.fullscreen.page = page;
			page.fullscreen.list = this.list;
			page.fullscreen.carousel = page.fullscreen.appendChild(this.cloneNode(true));
			u.sc(page.fullscreen.carousel, "imagefullscreen");
			page.fullscreen.carousel.fullscreen = page.fullscreen;
			page.fullscreen.resized = function() {
				var fullscreen = u.qs("#fullscreen");
				u.a.transition(fullscreen.carousel, "none");
				u.as(fullscreen.carousel, "width", fullscreen.carousel.nodes.length * fullscreen.offsetWidth+"px");
				fullscreen.image_width = fullscreen.offsetWidth > 960 ? 960 : (fullscreen.offsetWidth > 640 ? 640 : 320);
				for(i = 0; node = fullscreen.carousel.nodes[i]; i++) {
					u.a.setWidth(node, fullscreen.offsetWidth);
					u.a.setHeight(node, fullscreen.offsetHeight);
				}
				u.a.translate(fullscreen.carousel, -(fullscreen.list.current_image*fullscreen.offsetWidth), 0);
			}
			page.fullscreen.setup = function() {
				var i, node;
				u.a.transition(this.carousel, "none");
				u.a.setOpacity(this, 0);
				u.as(this.carousel, "left", "auto");
				u.as(this, "display", "block");
				this.carousel.nodes = u.qsa("li", this.carousel);
				u.a.setWidth(this.carousel, this.carousel.nodes.length * this.offsetWidth);
				this.image_width = this.offsetWidth > 960 ? 960 : (this.offsetWidth > 640 ? 640 : 320);
				u.e.addEvent(window, "resize", this.resized);
				for(i = 0; node = this.carousel.nodes[i]; i++) {
					u.a.setWidth(node, this.offsetWidth);
					u.a.setHeight(node, this.offsetHeight);
					node.initialized = false;
					node.fullscreen = this;
					node.i = i;
					node.item_id = u.getIJ(node, "id");
					if(node.className.match("movie")) {
						node.video_id = u.getIJ(node, "videoid");
						if(!page.player) {
							page.player = u.videoPlayer();
						}
						var play = u.qs(".play", node);
						play.page = page;
						play.node = node;
						u.e.click(play);
						play.clicked = function(event) {
							this.page.player.eject();
							this.page.player = this.node.appendChild(this.page.player);
							this.page.player.loadAndPlay(Peoplegroup.assets_image_path() + "/" + this.node.video_id + "/" + "video_960x540.mov");
						}
					}
				}
				this.carousel.controls = u.ae(this, "div", "controls");
				var zoom = u.ae(this.carousel.controls, "a", ({"class":"zoom"}));
				zoom.fullscreen = this;
				this.carousel.controls.zoom = zoom;
				u.e.click(zoom);
				zoom.clicked = function(event) {
					this.fullscreen.transitioned = function(event) {
						this.transitioned = null;
						u.a.transition(this, "none");
						this.parentNode.removeChild(this);
						u.as(this.page, "display", "block");
						window.scrollTo(0, this.page.scrolled_to);
						u.a.transition(this.page, "all 0.3s ease-in");
						u.a.setOpacity(this.page, 1);
						u.rc(document.body, "fullscreen");
					}
					u.e.removeEvent(document.body, "keyup", this.fullscreen.keycuts);
					u.e.removeEvent(window, "resize", this.fullscreen.resized);
					u.a.transition(this.fullscreen, "all 0.3s ease-in");
					u.a.setOpacity(this.fullscreen, 0);
				}
				u.e.addEvent(zoom, "mouseover", this.carousel._focusControls);
				this.imagelist = this.appendChild(this.list.cloneNode(true));
				this.imagelist.nodes = u.qsa("li", this.imagelist);
				if(this.imagelist.nodes.length > 1) {
					for(i = 0; node = this.imagelist.nodes[i]; i++) {
						node.fullscreen = this;
						node.i = i;
						u.link(node);
						node.clicked = function(event) {
							u.e.kill(event);
							this.fullscreen.selectImage(this.i);
						}
					}
					var prev = u.ie(this.carousel.controls, "a", ({"class":"prev"}));
					var next = u.ae(this.carousel.controls, "a", ({"class":"next"}));
					this.carousel.controls.prev = prev;
					this.carousel.controls.next = next;
					prev.fullscreen = this;
					next.fullscreen = this;
					u.e.click(prev);
					prev.clicked = function(event) {
						u.e.kill(event);
						this.fullscreen.selectImage(this.fullscreen.list.current_image-1)
					}
					u.e.click(next);
					next.clicked = function(event) {
						u.e.kill(event);
						this.fullscreen.selectImage(this.fullscreen.list.current_image+1)
					}
					u.e.addEvent(this.carousel, "mousemove", this.carousel.showControls);
					u.e.addEvent(prev, "mouseover", this.carousel._focusControls);
					u.e.addEvent(next, "mouseover", this.carousel._focusControls);
					this.keycuts = function(event) {
						if(event.keyCode == 27) {
							u.e.kill(event);
							u.qs("#fullscreen .zoom").clicked(event);
						}
						if(event.keyCode == 37) {
							u.e.kill(event);
							u.qs("#fullscreen .prev").clicked(event);
						}
						if(event.keyCode == 39) {
							u.e.kill(event);
							u.qs("#fullscreen .next").clicked(event);
						}
					}
					u.e.addEvent(document.body, "keyup", this.keycuts);
				}
				else {
					if(this.imagelist.nodes.length == 1) {
						this.imagelist.nodes[0].i = 0;
						this.imagelist.nodes[0].list = list;
					}
					this.keycuts = function(event) {
						if(event.keyCode == 27) {
							u.e.kill(event);
							u.qs("#fullscreen .zoom").clicked(event);
						}
					}
					u.e.addEvent(document.body, "keyup", this.keycuts);
					u.a.setOpacity(this.imagelist, 0);
				}
				this.selectImage(this.list.current_image, true);
				u.a.transition(this, "all 0.3s ease-in");
				u.a.setOpacity(this, 1);
			}
			page.fullscreen.carousel.hideControls = function() {
				this.t_hint = u.t.resetTimer(this.t_hint);
				u.a.transition(this.controls, "all 0.3s ease-out");
				u.a.setOpacity(this.controls, 0);
			}
			page.fullscreen.carousel.showControls = function() {
				if(this.t_hint) {
					this.t_hint = u.t.resetTimer(this.t_hint);
				}
				else {
					u.a.transition(this.controls, "all 0.5s ease-out");
					u.a.setOpacity(this.controls, 0.5);
				}
				this.t_hint = u.t.setTimer(this, this.hideControls, 1500);
			}
			page.fullscreen.carousel._focusControls = function() {
				this.fullscreen.carousel.t_hint = u.t.resetTimer(this.fullscreen.carousel.t_hint);
				u.a.transition(this.fullscreen.carousel.controls, "all 0.1s ease-out");
				u.a.setOpacity(this.fullscreen.carousel.controls, 1);
			}
			page.fullscreen.loadImage = function(image_index) {
				if(image_index >= 0 && image_index < this.carousel.nodes.length) {
					var node = this.carousel.nodes[image_index];
					if(node && !node.initialized) {
						node.initialized = true;
						node.loaded = function(event) {
							u.as(this, "backgroundImage", "url("+event.target.src+")");
							this.fullscreen.imageLoaded(this);
						}
						u.i.load(node, Peoplegroup.assets_image_path() + "/" + node.item_id + "/" + this.image_width + "_width." + u.getIJ(node, "format"));
					}
					else {
						this.imageLoaded(node);
					}
				}
			}
			page.fullscreen.imageLoaded = function(node) {
				if(node.i == this.list.current_image) {
					if(!this.className.match("ready")) {
						u.ac(this, "ready");
					}
					this.loadImage(this.list.current_image+1);
					this.loadImage(this.list.current_image-1);
				}
			}
			page.fullscreen.selectImage = function(index, hidden) {
				var page = u.qs("#page");
				if(page.player) {
					page.player.eject();
				}
				if(index >= 0 && index < this.carousel.nodes.length) {
					for(i = 0; node = this.imagelist.nodes[i]; i++) {
						u.rc(node, "selected");
					}
					u.ac(this.imagelist.nodes[index], "selected");
					if(this.carousel.controls.prev && this.carousel.controls.prev.parentNode) {
						this.carousel.controls.prev.style.display = "block";
						this.carousel.controls.next.style.display = "block";
						if(index == 0) {
							this.carousel.controls.prev.style.display = "none";
						}
						else if(index ==this.carousel.nodes.length-1) {
							this.carousel.controls.next.style.display = "none";
						}
					}
					this.list.selectImage(index, true);
					this.loadImage(this.list.current_image);
					if(hidden) {
						u.a.transition(this.carousel, "none");
					}
					else if(this.carousel.current_xps) {
						var duration = this.carousel.current_xps ? ((960 / Math.abs(this.carousel.current_xps)) * 0.7) : 0.7;
						duration = duration > 0.7 ? 0.7 : duration;
						u.a.transition(this.carousel, "all "+duration+"s ease-out");
					}
					else {
						u.a.transition(this.carousel, "all 0.7s ease-in-out");
					}
					u.a.translate(this.carousel, -(index*this.offsetWidth), 0);
				}
			}
			page.transitioned = function(event) {
				this.transitioned = null;
				u.a.transition(this, "none");
				u.as(this, "display", "none");
				this.fullscreen.setup();
			}
			u.a.transition(page, "all 0.3s ease-in");
			u.a.setOpacity(page, 0);
		}
		list.nodes = u.qsa("li", list);
		list.carousel.nodes = u.qsa("li", list.carousel);
		u.as(list.carousel, "width", (list.carousel.nodes.length*list.carousel.node_width) + "px");
		for(i = 0; node = list.carousel.nodes[i]; i++) {
			node.list = list;
			node.i = i;
			node.item_id = u.getIJ(node, "id");
			node.innerHTML = "";
			u.a.setWidth(node, list.carousel.node_width);
			u.a.setHeight(node, list.carousel.offsetHeight);
			if(node.className.match("movie")) {
				node.video_id = u.getIJ(node, "videoid");
				if(!page.player) {
					page.player = u.videoPlayer();
				}
				var play = u.ae(node, "a", "play");
				play.page = page;
				play.node = node;
				u.e.click(play);
				play.clicked = function(event) {
					this.page.player.eject();
					this.page.player = this.node.appendChild(this.page.player);
					this.page.player.loadAndPlay(Peoplegroup.assets_image_path() + "/" + this.node.video_id + "/" + "video_678x381.mov");
				}
			}
		}
		list.carousel.controls = u.ae(list.carousel.parentNode, "div", "controls");
		u.e.addEvent(list.carousel, "mousemove", list.carousel.showControls);
		var zoom = u.ae(list.carousel.controls, "a", ({"class":"zoom"}));
		list.carousel.controls.zoom = zoom;
		zoom.list = list;
		u.e.click(zoom);
		zoom.clicked = function(event) {
			this.list.carousel.fullScreen(this.list.current_image);
		}
		u.e.addEvent(zoom, "mouseover", list.carousel._focusControls);
		if(list.nodes.length > 1) {
			for(i = 0; node = list.nodes[i]; i++) {
				node.list = list;
				node.i = i;
				u.link(node);
				node.clicked = function(event) {
					u.e.kill(event);
					this.list.selectImage(this.i);
				}
			}
			var prev = u.ie(list.carousel.controls, "a", ({"class":"prev"}));
			var next = u.ae(list.carousel.controls, "a", ({"class":"next"}));
			list.carousel.controls.prev = prev;
			list.carousel.controls.next = next;
			prev.list = list;
			next.list = list;
			u.e.click(prev);
			prev.clicked = function(event) {
				u.e.kill(event);
				this.list.selectImage(this.list.current_image-1)
			}
			u.e.click(next);
			next.clicked = function(event) {
				u.e.kill(event);
				this.list.selectImage(this.list.current_image+1)
			}
			u.e.addEvent(prev, "mouseover", list.carousel._focusControls);
			u.e.addEvent(next, "mouseover", list.carousel._focusControls);
		}
		else {
			if(list.nodes.length == 1) {
				list.nodes[0].i = 0;
				list.nodes[0].list = list;
			}
			u.a.setOpacity(list, 0);
		}
		list.current_image = 0;
		list.selectImage(list.current_image);
	}
}
Util.Objects["sharing"] = new function() {
	this.init = function(tools) {
		var page = u.qs("#page");
		var icon = u.qs(".shareicon", tools);
		icon.tools = tools;
		var sharetext = u.qs(".sharetext", tools);
		sharetext.tools = tools;
		var facebook = u.qs(".facebook", tools);
		facebook.tools = tools;
		var email = u.qs(".email", tools);
		email.tools = tools;
		var twitter = u.qs(".twitter", tools);
		twitter.tools = tools;
		tools.icon = icon;
		tools.sharetext = sharetext;
		tools.facebook = facebook;
		tools.email = email;
		tools.twitter = twitter;
		u.as(sharetext, "display", "none");
		u.as(sharetext, "opacity", "0");
		u.as(facebook, "display", "none");
		u.as(facebook, "opacity", "0");
		u.as(email, "display", "none");
		u.as(email, "opacity", "0");
		u.as(twitter, "display", "none");
		u.as(twitter, "opacity", "0");
		tools.show = function() {
			u.ac(this, "show");
			u.t.resetTimer(this.t_hide);
			u.as(this.sharetext, "display", "inline-block");
			u.as(this.facebook, "display", "inline-block");
			u.as(this.email, "display", "inline-block");
			u.as(this.twitter, "display", "inline-block");
			u.a.transition(this.twitter, "all 0.15s ease-in");
			u.a.setOpacity(this.twitter, 1);
			u.a.transition(this.email, "all 0.15s ease-in 0.07s");
			u.a.setOpacity(this.email, 1);
			u.a.transition(this.facebook, "all 0.15s ease-in 0.15s");
			u.a.setOpacity(this.facebook, 1);
			u.a.transition(this.sharetext, "all 0.15s ease-in 0.22s");
			u.a.setOpacity(this.sharetext, 1);
		}
		tools.hide = function() {
			u.rc(this, "show");
			u.t.resetTimer(this.t_hide);
			this.sharetext.transitioned = function() {
				this.transitioned = null;
				u.as(this.tools.sharetext, "display", "none");
				u.as(this.tools.facebook, "display", "none");
				u.as(this.tools.email, "display", "none");
				u.as(this.tools.twitter, "display", "none");
			}
			u.a.transition(this.sharetext, "all 0.2s ease-out");
			u.a.setOpacity(this.sharetext, 0);
			u.a.transition(this.facebook, "all 0.2s ease-out");
			u.a.setOpacity(this.facebook, 0);
			u.a.transition(this.email, "all 0.2s ease-out");
			u.a.setOpacity(this.email, 0);
			u.a.transition(this.twitter, "all 0.2s ease-out");
			u.a.setOpacity(this.twitter, 0);
		}
		u.e.click(icon);
		icon.clicked = function(event) {
			u.e.kill(event);
			if(this.tools.className.match("show")) {
				this.tools.hide();
			}
			else {
				this.tools.show();
			}
		}
		if(u.e.event_pref == "mouse") {
			icon.onmouseover = facebook.onmouseover = email.onmouseover = twitter.onmouseover = function(event) {
				this.tools.show();
			}
			icon.onmouseout = facebook.onmouseout = email.onmouseout = twitter.onmouseout = function(event) {
				if(this.tools.className.match(/show/g)) {
					this.tools.t_hide = u.t.setTimer(this.tools, this.tools.hide, 1000);
				}
			}
		}
		if(typeof(tools.ready) == "function") {
			u.ac(tools, "ready");
			tools.ready();
		}
	}
}

Util.Objects["twitter"] = new function() {
	this.init = function(e) {
		e.Response = function(response) {
			var i, object, node;
			if(response.length) {
				var list = this.insertBefore(document.createElement("ul"), u.qs(".follow", this));
				for(i = 0; object = response[i]; i++) {
					node = u.ae(u.ae(list, "li"), "p");
					u.ae(node, "span", ({"class":"published"})).innerHTML = u.date("j. F", response[i].created_at, u.txt["months"]);
				 	var url_pattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
					node.innerHTML += response[i].text.replace(url_pattern, '<a href="$&" target="_blank">$&</a>');
				}
			}
		}
		var twitter_id = u.qs(".follow", e).href.replace("http://twitter.com/", "");
		u.Request(e, "https://api.twitter.com/1/statuses/user_timeline.json?screen_name="+twitter_id+"&include_entities=true&include_rts=true&trim_user=true&count=4&", false, "SCRIPT");
	}
}

u.ga_account = 'UA-31194908-1';

if(u.ga_account) {
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', u.ga_account]);
	_gaq.push(['_trackPageview']);
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	u.stats = new function() {
		this.pageView = function(url) {
			_gaq.push(['_trackPageview', url]);
		}
		this.event = function(node, action, label) {
			_gaq.push(['_trackEvent', location.href.replace(document.location.protocol + "//" + document.domain, ""), action, (label ? label : this.nodeSnippet(node))]);
		}
		this.customVar = function(slot, name, value, scope) {
			_gaq.push(['_setCustomVar',
			      slot,		// This custom var is set to slot #1.  Required parameter.
			      name,		// The name of the custom variable.  Required parameter.
			      value,	// The value of the custom variable.  Required parameter.
			      scope		// Sets the scope to visitor-level.  Optional parameter.
			 ]);
		}
		this.nodeSnippet = function(e) {
			if(e.textContent != undefined) {
				return u.cutString(e.textContent.trim(), 20) + "(<"+e.nodeName+">)";
			}
			else {
				return u.cutString(e.innerText.trim(), 20) + "(<"+e.nodeName+">)";
			}
		}
	}
}

window.google = window.google || {};
google.maps = google.maps || {};
(function() {
  function getScript(src) {
    document.write('<' + 'script src="' + src + '"' +
                   ' type="text/javascript"><' + '/script>');
  }
  var modules = google.maps.modules = {};
  google.maps.__gjsload__ = function(name, text) {
    modules[name] = text;
  };
  google.maps.Load = function(apiLoad) {
    delete google.maps.Load;
    apiLoad([0.009999999776482582,[[["http://mt0.googleapis.com/vt?lyrs=m@199000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=m@199000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"m@199000000"],[["http://khm0.googleapis.com/kh?v=122\u0026hl=en-US\u0026","http://khm1.googleapis.com/kh?v=122\u0026hl=en-US\u0026"],null,null,null,1,"122"],[["http://mt0.googleapis.com/vt?lyrs=h@199000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=h@199000000\u0026src=api\u0026hl=en-US\u0026"],null,null,"imgtp=png32\u0026",null,"h@199000000"],[["http://mt0.googleapis.com/vt?lyrs=t@129,r@199000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=t@129,r@199000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"t@129,r@199000000"],null,[[null,0,7,7,[[[330000000,1246050000],[386200000,1293600000]],[[366500000,1297000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=en-US\u0026"]],[null,0,8,8,[[[330000000,1246050000],[386200000,1279600000]],[[345000000,1279600000],[386200000,1286700000]],[[354690000,1286700000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=en-US\u0026"]],[null,0,9,9,[[[330000000,1246050000],[386200000,1279600000]],[[340000000,1279600000],[386200000,1286700000]],[[348900000,1286700000],[386200000,1302000000]],[[368300000,1302000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=en-US\u0026"]],[null,0,10,19,[[[329890840,1246055600],[386930130,1284960940]],[[344646740,1284960940],[386930130,1288476560]],[[350277470,1288476560],[386930130,1310531620]],[[370277730,1310531620],[386930130,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=en-US\u0026"]],[null,3,7,7,[[[330000000,1246050000],[386200000,1293600000]],[[366500000,1297000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=en-US\u0026"]],[null,3,8,8,[[[330000000,1246050000],[386200000,1279600000]],[[345000000,1279600000],[386200000,1286700000]],[[354690000,1286700000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=en-US\u0026"]],[null,3,9,9,[[[330000000,1246050000],[386200000,1279600000]],[[340000000,1279600000],[386200000,1286700000]],[[348900000,1286700000],[386200000,1302000000]],[[368300000,1302000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=en-US\u0026"]],[null,3,10,null,[[[329890840,1246055600],[386930130,1284960940]],[[344646740,1284960940],[386930130,1288476560]],[[350277470,1288476560],[386930130,1310531620]],[[370277730,1310531620],[386930130,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=en-US\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=en-US\u0026"]]],[["http://cbk0.googleapis.com/cbk?","http://cbk1.googleapis.com/cbk?"]],[["http://khm0.googleapis.com/kh?v=67\u0026hl=en-US\u0026","http://khm1.googleapis.com/kh?v=67\u0026hl=en-US\u0026"],null,null,null,null,"67"],[["http://mt0.googleapis.com/mapslt?hl=en-US\u0026","http://mt1.googleapis.com/mapslt?hl=en-US\u0026"]],[["http://mt0.googleapis.com/mapslt/ft?hl=en-US\u0026","http://mt1.googleapis.com/mapslt/ft?hl=en-US\u0026"]],[["http://mt0.googleapis.com/vt?hl=en-US\u0026","http://mt1.googleapis.com/vt?hl=en-US\u0026"]]],["en-US","US",null,0,null,null,"http://maps.gstatic.com/mapfiles/","http://csi.gstatic.com","https://maps.googleapis.com","http://maps.googleapis.com"],["http://maps.gstatic.com/intl/en_us/mapfiles/api-3/10/18","3.10.18"],[2604365144],1.0,null,null,null,null,1,"",null,null,0,"http://khm.googleapis.com/mz?v=122\u0026",null,"https://earthbuilder.google.com","https://earthbuilder.googleapis.com"], loadScriptTime);
  };
  var loadScriptTime = (new Date).getTime();
  getScript("http://maps.gstatic.com/intl/en_us/mapfiles/api-3/10/18/main.js");
})();
