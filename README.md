#### Knockout JS

----------

A lightweight Javascript library that makes creating interactive user interfaces fast and simple.

Knockout JS provides a two-way binding between HTML Markup and Javascript. This functionality provides a means to create dynamic and intuitive web applications that focus upon user interaction and experience.  Or, as Steven Sanderson states "[Knockout] makes it easier to create rich, desktop-like user interfaces with Javascript and HTML" (Sanderson, 2010). 

----------

#### Keeping it Clean

----------

Knockout uses dependency tracking and data-binding to help keep code clean and concise.  Dependency tracking is achieved through declaring 'observables' in a viewmodel and data-binding by using a 'data-bind' HTML attribute in the view.  These two features allow for declarative HTML markup that is clearly structured, and Javascript which deals with Model behaviour.  Throughout implementing Knockout within EMR/workflows we have created conventions and patterns that will allow us to write maintainable and succinct code.  To ensure our code is readable and consistent across the entire project, these conventions can be used as guidelines.

Throughout the document, code snippets will be shown for greater clarification regarding the subjects.  These fragments will emphasise the importance of the syntax, code structure and design patterns.

Access to the full code is available through git:
```
git clone https://github.com/HistoireDeBabar/ko-home-example.git

cd ko-home-example

git checkout ko-01
```

--------

###### Round 1: The Basics

--------

An **Observable** can take the form of any property on a viewmodel that is required editable.  This includes simple properties, lists and objects. To declare an observable you simply use the ko.observable function, or ko.observableArray in the case of arrays.  Take the following:
```javascript
viewModel = {
    house_: ko.observable({
        number_: ko.observable(0),
        residents_: ko.observableArray([]),
        remove: function(resident){
	//remove resident functionality
 	}
    })
}
```

We are declaring our view model in a Javascript object literal notation.  The view model itself is not observable, however its properties are.  The observable function creates a wrapper object around a supplied value. Therefore our property is a reference to the observable wrapper, not the value itself.  This is an important distinction as it affects both how to set and get the value of a property.  In both scenarios it differs from how it is done in vanilla Javascript.

To return the value which is contained within an observable property we would do the following:

```javascript
var value = number_();
console.log(value);
//console print: 0
```
We can see by calling a property with an empty set of parenthesis unwraps the value to a normal variable which we can then use as standard Javascript. 

In the first example we see that we are both declaring a property as an observable and also instantiating it with a value. This is not required by knockout.  By creating an observable with value we clarify that we are setting value to a property.  Similarly we are indicating what type should be stored in an observable. Like plain Javascript the value of an observable isn't type specific. Thus we could call viewModel.house_("dog");  which would have the effect of changing the type of house from an object to a String. Therefore by specifying initial value at declaration we are providing a blueprint of our viewmodels for ourselves and the rest of the team.

--------

###### Round 2: Data-binding

--------

When implementing data-binding in the DOM we are declaring that a property should contain the value (or functionality) of a property within our view model.  We want to do this in a clear, concise and consistent way to provide longevity and maintainability to our code.  Following from our basic example from above, we will extend the view model to demonstrate how to implement knockouts data-binding in favour of Model Manipulation over DOM Manipulation.
```html
<div data-bind="with: house_">
    <p>House Number: <span data-bind="text: number_"></span></p>
    <!-- ko foreach: residents_ -->
<p>Name: <span data-bind="text: $data.name_"></span> <span data-bind="click: $parent.remove.bind($parent, $data)">X</span></p>
    <!-- /ko -->
</div>
```

Firstly we can see that the example has presumed some extra values and functions.  Namely, that our objects within our residents will have an observable property called name.  For the time being, let us assume that we have programmed that functionality already.

In this small and simple example we are actually demonstrating a lot of data-bindings.  To begin with, to bind the data we must use the ```data-bind=""``` attribute on our desired html element.  next is the binding attribute of the data-bind.  Knockout comes with a lot of out of the box  functionality, in this example we can see we are using with, text, foreach and click. However, they are many more including, but not limited to;  value, if and ifnot.  Furthermore, as we will see in later chapters, adding our own custom data-binding is not only good practice, but also easy to implement. 

By enlarge data-binding is done through attaching the data-bind attribute to html tags.  However, we can also see from the example an alternative comment-based syntax.  Initially it may seem that this simply clutters our view, or attaches too much logic within the html document.  However, from extensive use of knockout we have came to the conclusion that comment based syntax can be clearer to understand and also begins to separate the view model from the view itself.  Comment based syntax is commonly used with the foreach, if and ifnot bindings.  However, it can also be used in other cases too.  It’s advantages are that it is simple to understand, and simple to spot.  In some cases the comment based syntax isn’t strictly needed when used with for-loops, for example if the element is a natural parent - e.g. a ```<ul>``` or ```<tr>``` tag.  However, instead of multiple implementations of the same data-binding, we have decided to primarily use comment based syntax.  Another advantage to the comment based syntax is that it does not bind the logic to an html element.  Thus, allowing us to the elements if needed, giving us added flexibility and clarity.

The with binding allows us to compartmentalise our html to reflect specific sections of our viewmodel.  In the example we have a div that will contain the manipulation of our house object.  Not only does the with binding encapsulate the modular object, but it also makes our code cleaner.  If we did not use the with binding, all of our properties would look like the following ```data-bind="text: house.number"```.  In most cases using with is almost always a better as it ensures we are working within context to the object we are working on.

The text data-binding is a basic binding that simply displays the attribute with the value of the property. The value data binding is a way to edit that property which can be used in input tags.  

Click events in html can be triggered (or listened for) through various implementations.  Similar to how it’s possible use the html onclick attribute, or register a jquery event listener.  Knockout is designed to work alongside other frameworks nicely, so it would be possible to use with a jQuery click event (thus hiding the data-binding in the DOM completely).  Nonetheless, we wish to standardise the way in which we are calling functions and events from our HTML which will provide the most loosely coupled view and viewmodel.  Therefore we are using the click attribute Knockout provides to bind to a function on the viewmodel.  Our click example is passing in a parameter, thus we need to use the function.bind(context, args) syntax.  The args can be anything you wish, in our case it is a ‘resident’ object of our residents array and we pass it in using the $data scope keyword.  The context parameter is what context this will be in the scope of the function.  In this case, we want it to be the house object.  If we do not wish to pass in arguments we do not need to include parenthesis.  A sudo example would be data-bind="click: function". 

When binding to any property or function we must take into consideration the scope we are presently in.  The three common scoping calls are ```$root```, ```$parent``` and ```$data```.  The later two are present in our basic example.  

* ```$root``` is to whatever object we apply our bindings too.  Therefore it is our top most level, our root, from which everything else belongs too.  It provides simple and easy navigation to the correct embedded objects and can be used like an absolute path from the viewmodel.

* ```$parent``` can be used to specify a direct parent object of the current context.  The parent relates to the DOM and the context which it is being called from.  In the example above we are using parent to escape the for-loop (```$data```) context and call a method from the home object context.  The ```$parent``` scope also provides another reason for us to use the with binding.  If our example did not include the with statement, the ```$parent``` of the for-loop would pass to the viewmodel itself, not the house object.  By using with and the scoping keywords we are providing clarity to the current context.

* ```$data``` is the current context.  It is often not required, however, can be spotted within the context of a for loop.  ```$data``` is implied and not needed to access properties of that object, however it can be clearer to use it.  In the example above we have used it to pass as an argument in our function parameter, and to access a property.  The simplest way to conceptually explain $data is through association.  Below, the variable resident what the key word ```$data``` represents.  Thus, the ```$data``` refers to an instance of an object within the loop.

```javascript
for (var i in residents_){

    var resident = residents_[i] ; 

}
```
	

The data-binding Knockout provides out of the box is extensive for common functionality and data models.  In the examples above we have not created every possible binding.  However, the upcoming chapters and examples will make use of other common attributes.  What we have provided is a clear way in which we intend to use data-bindings to manipulate our models and objects.  Other common bindings to be aware of are; options , visible , css and checked among all that have been previously mentioned. 
```
*checkout** ko-02*
```
The second checkout is a big jump in how our code is structured.  We have moved the code to use require.js to show a modular example.  However, other than a couple of new implementations, the Knockout hasn’t introduced new conventions or patterns.
```html
	<div data-bind="with: house_">
		<p>Change number</p>
		<input type="number" data-bind="value: newNumber_" />
		<button data-bind="click: saveNumber"> Save Number</button>
	</div>
```

The snippet above highlights the use of value.  We can see that we’re not binding to ‘number_’ but ‘newNumber_’.  The reason for this is to have an intermediate stage to editing the data in our model.  The saveNumber function simply pushes the newNumber_ value into the number_ property.  This is a fairly common pattern to prevent accidently replacing the data in our model.

---------

###### Round 3: Validation (Extended, Computed Observables and Custom-Bindings)

---------

Extensions, Computed Observables and Custom-Bindings are more ‘*advanced*’ topics of Knockout.  All three topics can be demonstrated through validating our view models.  

Extended Methods

Extended methods are methods that (unsurprisingly) extend the observable object.  The extension applies to the observable itself, not the property within.  The extension must be specified when instantiating an observable.  This means that not all observables inherit the extension methods by default.

To define an extension method we must add a new function to the ko.extenders object.
```javascript
   ko.extenders.targetIsGreaterThanOption = function(target,option){};
```

above we are declaring a new function to the extenders and are passing in two parameters, the target (observable this extension will be attached to) and an option.  The option can vary in each case.  In this example it will be used to verify that the target is greater than a specified number (the option).

Before looking at the implementation and how we can use this to validate a property, we’ll quickly show the syntax for attaching the extender to an observable.

```javascript
this.newNumber_ = ko.observable(0).extend({targetIsGreaterThanOption : 0});
```

Above shows how simple it is to extend and attach the extension to a specific instance of an observable.

The extenders allow us to augment behaviour of an observable, as well as supply additional features to them.  Thus, through using extenders we can add a ```hasError()``` method.  Now we can call ```newNumber_.hasError()``` and be returned a boolean value.  

The example below shows the full implementation method of the ```targetIsGreaterThanOption``` method used to attach and verify whether or not the observable has an error.
```javascript
     ko.extenders.targetIsGreaterThanOption = function(target, option){
        target.hasError = ko.observable();
        function validate(newValue){
            target.hasError(newValue <= option);
        };
        target.subscribe(function(newValue) {

             validate(newValue);
        });
        validate(target());
        return target;
    };
```
Firstly, we’re attaching a new property to the observable (```hasError```), we then declare our validate method.  Following the implementation of our validation method we want to tell Knockout to run it every time the value of the specified observable changes.  We can do this with the in-built subscribe function of an observable.  

We’re then calling the validate function, before finally returning the target.

We finally have the capability to determine whether an observable has an error or not.  We should be ensuring that the extensions are as generic as possible to allow for reuse across the whole site.

*Custom Bindings*

Custom bindings have a similar concept and syntax to extenders.  If we’re splitting our domains into view and viewModel the binding would be within the view’s domain and the extender in the viewModels.

We define our custom handler with the following syntax:
```javascript
 ko.bindingHandlers.something = {
	init : function(element, valueAccessor, allBindings, viewModel, bindingContext){
		//implementation
	},

	update : function(element, valueAccessor, allBindings, viewModel, bindingContext){
		//implementation
	}

};
```
Similar to the extenders we are attaching ‘something’ to a knockout object.  In this case to the ```bindingHandlers``` object.  However unlike the extenders (where we attached a function) we are adding a new object which contains two functions init and update.  The object doesn’t actually need both functions, and both functions don’t need all of the parameters.  Therefore we can pick and choose the required ones for each instance.  We’re going to add a validate custom binding to tell knockout to call the new hasError function of our observable.

The ```init``` method is called once for each time the binding is used in the DOM.  The reasons for the init method are two fold.  Firstly, to instantiate any requirements or state to the observable, and also to register event handlers for when the DOM element changes (not the observable, or the value within it).

The ```update``` method is called when the value of the observable changes.  To track this change, and bring the observable into the function we must use the ```valueAccessor``` parameter.  We can then unwrap the observable to access its current value.

We declare custom bindings in the view, exactly the same way we declare standard bindings:
```
data-bind="customBinding: observable_"
```

For this example we’re using a custom binding validate that will be used to call the observables ```hasError``` function and apply a css class to the element is id bound too.

```javascript
   ko.bindingHandlers.validate = {
        update: function(element, valueAccessor, allBindings) {
            var observable_ = valueAccessor();
            var className = allBindings.get('className') || 'error';
            var value = ko.unwrap(observable_);
            if(observable_.hasError()) {
                element.className = className;
            } 
            else {
                element.classList.remove(className);
            }
        }
    };
```

Firstly, we notice that we don’t have an init function.  This is simply because we don’t need one.  We don’t wish to add any state to this binding, as we don’t want to validate the observable until the value has been changed.  The parameters included are also the only ones we need.  The allBindings parameter is a very useful argument to define generic methods without enforcing your viewModel to have specific properties of functions.  In this example, it is used to allow users to pass in a class name to apply to the element.  The validation binding then determines whether an observable has has an error then applies (or removed) a class to the element if necessary.

In the DOM this binding looks like:

```html
<input type="number" data-bind="value: newNumber_, validate: newNumber_, className: 'error'" />
```
In the example we’re stilling using the Knockout value binding, with our own validate (pointing to the same observable), finally we’re adding our own optional className binding which the validate binding uses.  This is optional but does provide flexibility.

*Computed Observables*

The final piece of the validation jigsaw is the Computed Observable.  Computed Observables, as with extenders, and custom bindings, are also very useful outside the scope of validation.  A Computed Observable is simply an observable which is built from one or many others.  Thus a popular ‘hello, world!’ example is:

```javascript
this.fullName_ = ko.pureComputed(function() {
	return this.firstName_() + " " + this.secondName_();
}, this);
```

this allows us to create custom ‘wrapper’ observables for commonly used values.  We use a computed observable  in the DOM exactly the same as a normal observable.

pureComputed is the superior brother of the computed function which is only available in Knockout 3.2.0 and should only be used when the method is *pure*. That is when the computed observable doesn’t try to modify state, depend upon ‘hidden’ components, or cause side effects.  the pureComputed method is preferable as it it reduces computation overhead and prevents memory leaks.

The second argument in the ```pureComputed``` function is the scope.  This allows us to use ‘this’ within the anonymous function, but still retain the correct scope.

When it’s possible to send a complete model back to the server (or from an editor-model to the ‘true’ model), we have declared an ```isValid``` computed observable that simply returns true or false depending upon the hasError extensions which have have bound to our observables.  Owed to the specificity of the isValid function it is better practice to create a computed rather than creating a ‘non-generic’ extender.

To see a full version of the validation 
```
checkout ko-03
```
---------

####### The Final Round

---------

This document has aimed to achieve a brief description of Knockout.js and the functionality it provides.  The examples provided are both basic, yet sufficient enough replicate how Knockout can be used to manipulate models over DOM manipulation.

This document has not described every single variation of data-binding and other functionality of Knockout.  For reference, the Knockout documentation is very extensive (see [http://knockoutjs.com/](http://knockoutjs.com/) ).

For a more complex example, using some more databindings a library prototype is available which incorporates the AMD pattern, Knockout and Jasmine (testing) at [https://github.com/HistoireDeBabar/proto-library.git](https://github.com/HistoireDeBabar/proto-library.git) 

