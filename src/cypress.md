# Cypress

### Overview

-  What is End to End Testing
-  Why Cypress for end to end testing
-  Installing and Running Cypress tests
-  Cypress API
-  Custom commands in Cypress
-  Stubbing network requests in Cypress
-  Cypress Best Practices
-  Cypress Folder Structure
-  Example Test Suite

### What is End to End Testing

An end-to-end test is where the complete application is tested from start to finish. This involves making sure that all integrated aspects of an application function together as expected.

End-to-end tests attempt to simulate actual user actions and, therefore, test how a real user would likely use the application.

The E2E test covers those sections of an application that unit tests and integration tests don't necessarily cover. This is because unit and integration tests only pick up a small portion of the application and assess that portion in isolation.

Assuming that these portions of the application work as intended in isolation, developers cannot possibly confirm if they will work together as a complete unit. This is where having a range of end-to-end tests over and above unit and integration tests prove useful. It helps to get a better idea of the entire application as a whole.

End-to-end tests are primarily used to

-  Specify the system we are using
-  Prevent regression and bugs
-  Perform ongoing and continuous integration.

Additionally, these tests are designed to run as frequently as possible. This is so that they can provide constant feedback and help ensure that our systems remain clean and bug-free from the end user's perspective.

The main idea behind conducting E2E tests is the benefit of an additional layer of a fully automated testing suite. These benefits include an increase in developer velocity and others.

### Why Cypress for end to end testing

Most testing tools (like Selenium) operate by running outside of the browser and executing remote commands across the network. Cypress is the exact opposite. Cypress is executed in the same run loop as our application.

Behind Cypress is a Node server process. Cypress and the Node process constantly communicate, synchronize, and perform tasks on behalf of each other. Having access to both parts (front and back) gives it the ability to respond to our application’s events in real time, while at the same time work outside of the browser for tasks that require a higher privilege.

Cypress also operates at the network layer by reading and altering web traffic on the fly. This enables Cypress to not only modify everything coming in and out of the browser, but also to change code that may interfere with its ability to automate the browser.

Cypress ultimately controls the entire automation process from top to bottom, which puts it in the unique position of being able to understand everything happening in and outside of the browser. This means Cypress is capable of delivering more consistent results than any other testing tool.

Because Cypress is installed locally on our machine, it can additionally tap into the operating system for automation tasks. This makes performing tasks such as taking screenshots, recording videos, general file system operations and network operations possible.

### Installing and Running Cypress tests

Read about installing cypress, cypress test runner and opening cypress test runner [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html)

After opening the test runner you can select the spec or end to end test file you want to run

If you want to run cypress tests with the help of command line then you can follow the steps mentioned [here](https://docs.cypress.io/guides/guides/command-line.html#How-to-run-commands)

### Cypress API

#### cy.server()

Start a server to begin routing responses to cy.route() and to change the behavior of network requests.

##### Syntax

```
cy.server()
cy.server(options)
```

##### Usage

###### Correct Usage

```
cy.server()
```

#### cy.visit()

This command is used to visit a remote URL
Best Practice: We recommend setting a baseUrl when using cy.visit().

##### Syntax

```
cy.visit(url)
cy.visit(url, options)
cy.visit(options)
```

##### Examples

```
cy.visit('http://localhost:3000')    // Yields the window of the remote page
cy.visit('./pages/hello.html')
cy.visit('/index.html', { timeout: 30000 })  // Wait 30 seconds for page 'load' event
```

You can provide query parameters as an object to `cy.visit()` by passing qs to `options`.

```
cy.visit('http://localhost:3500/users', {
  qs: {
    page: '1',
    role: 'admin'
  }
})
```

#### cy.get()

This command is used to get one or more DOM elements by selector or alias.

##### Syntax

```
cy.get(selector)
cy.get(alias)
cy.get(selector, options)
cy.get(alias, options)
```

##### Examples

```
cy.get('list')
cy.get('input')
cy.get('[data-testid="inputElement"]')
cy.get('input').should('have.value','Charlie') /get can be chained of other commands like should, contains, click, type etc.. /
```

The elements that are yielded by the get command can be aliased

```
cy.get('ul#todos').as('todos')
// later this element can be accessed as todos
cy.get('@todos')
```

#### cy.contains()

Get the DOM element containing the text. DOM elements can contain more than the desired text and still match.

##### Syntax

```
.contains(content)
.contains(content, options)
.contains(selector, content)
.contains(selector, content, options)

// ---or---
cy.contains(content)
cy.contains(content, options)
cy.contains(selector, content)
cy.contains(selector, content, options)

```

##### Usage

###### Correct Usage

```
cy.get('.nav').contains('About') // Yield el in .nav containing 'About'
cy.contains('Hello') // Yield first el in document containing 'Hello'

```

###### Incorrect Usage

```
cy.title().contains('My App') // Errors, 'title' does not yield DOM element
cy.getCookies().contains('key') // Errors, 'getCookies' does not yield DOM element

```

##### Examples

```
<ul>
    <li>apples</li>
    <li>oranges</li>
    <li>bananas</li>
</ul>

// yields <li>apples</li>
cy.contains('apples')

```

```
<button class="btn btn-primary" type="button">
    Messages <span class="badge">4</span>
</button>

// yields <button>
cy.contains(4)

```

Even though the `<span>` is the deepest element that contains a “4”, Cypress automatically yields `<button>` elements over spans because of its [preferred element order](https://docs.cypress.io/api/commands/contains.html#Preferences).

#### cy.wait()

Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command.

##### Syntax

```
cy.wait(time)
cy.wait(alias)
cy.wait(aliases)
cy.wait(time, options)
cy.wait(alias, options)
cy.wait(aliases, options)
```

##### Examples

```
cy.wait(2000) // wait for 2 seconds
cy.wait('@getAccount') // wait for alias
cy.wait(['@getUsers', '@getActivities', '@getComments']) // wait for aliases
```

##### Anti-Pattern

You almost never need to wait for an arbitrary period of time. There are always better ways to express this in Cypress.

#### cy.go()

Navigate back or forward to the previous or next URL in the browser’s history.

##### Syntax

```
cy.go(direction)
cy.go(direction, options)
```

##### Examples

```
cy.go('back')   // equivalent to clicking back button
cy.go('forward') // equivalent to clicking forward button
cy.go(-1)       // equivalent to clicking back button
cy.go(1)        // equivalent to clicking forward button
```

#### cy.reload()

Reload the page.

##### Syntax

```
cy.reload()
cy.reload(forceReload)
cy.reload(options)
cy.reload(forceReload, options)
```

##### Examples

**No args**

```
cy.visit('http://localhost:3000/admin')
cy.get('#undo-btn').click().should('not.be.visible')
cy.reload()
cy.get('#undo-btn').click().should('not.be.visible')
```

**Force Reload**

```
cy.visit('http://localhost:3000/admin')
cy.reload(true)
```

#### cy.route()

Use `cy.route()` to manage the behavior of network requests.

##### Syntax

```
cy.route(url)
cy.route(url, response)
cy.route(method, url)
cy.route(method, url, response)
cy.route(callbackFn)
cy.route(options)
```

##### Examples

**Without Stubbing**

```
cy.server()
cy.route('**/users').as('getUsers')
cy.visit('/users')
cy.wait('@getUsers')
```

**With Stubbing**

```
cy.server()
cy.route('https://localhost:7777/surveys/customer?email=john@doe.com', [
  {
    id: 1,
    name: 'john'
  }
])
```

#### cy.setCookie()

Set a browser cookie.

##### Syntax

```
cy.setCookie(name, value)
cy.setCookie(name, value, options)
```

##### Examples

```
cy.setCookie('session_id', '189jd09sufh33aaiidhf99d09')
```

For more cypress commands visit [cypress docs](https://docs.cypress.io/api/api/table-of-contents.html)

#### type()

Type into a DOM element.

#### Syntax

```
.type(text)
.type(text, options)
```

#### Usage

##### Correct Usage

```
cy.get('input').type('Hello, World') // Type 'Hello, World' into the 'input'
```

##### Incorrect Usage

```
cy.type('Welcome') // Errors, cannot be chained off 'cy'
cy.url().type('www.cypress.io') // Errors, 'url' does not yield DOM element
```

### Custom commands in Cypress

Cypress comes with its own API for creating custom commands and overwriting existing commands. The built in Cypress commands use the very same API that’s defined below.

A great place to define or overwrite commands is in your cypress/support/commands.js file, since it is loaded before any test files are evaluated via an import statement in your supportFile (cypress/support/index.js by default).

#### Syntax

```
Cypress.Commands.add(name, callbackFn)
Cypress.Commands.add(name, options, callbackFn)
Cypress.Commands.overwrite(name, callbackFn)
```

#### Examples

```
Cypress.Commands.add('login', (email, pw) => {})
Cypress.Commands.overwrite('visit', (orig, url, options) => {})
```

```
Cypress.Commands.add('login', () => {
   cy.setCookie('access_token', 'accesstoken')
   cy.setCookie('refresh_token', 'refreshtoken')
   cy.setCookie('user_id', 'usertoken')
})
```

Read more about custom commands in cypress [here](https://docs.cypress.io/api/cypress-api/custom-commands.html#Syntax)

### Stubbing network requests in Cypress

Cypress helps you test the entire life cycle of Ajax / XHR requests within your application. Cypress provides you direct access to the XHR objects, enabling you to make assertions about its properties. Additionally you can even stub and mock a request’s response.

Common testing scenarios:

-  Asserting on a request’s body
-  Asserting on a request’s url
-  Asserting on a request’s headers
-  Stubbing a response’s body
-  Stubbing a response’s status code
-  Stubbing a response’s headers
-  Delaying a response
-  Waiting for a response to happen

Within Cypress, you have the ability to choose whether to stub responses or allow them to actually hit your server. You can also mix and match within the same test by choosing to stub certain requests, while allowing others to hit your server.

Let’s investigate both strategies, why you would use one versus the other, and why you should regularly use both.

#### Stub Responses

Stubbing responses enables you to control every aspect of the response, including the response body, the status, headers, and even network delay. Stubbing is extremely fast, most responses will be returned in less than 20ms.Stubbing responses is a great way to control the data that is returned to your client.

You don’t have to do any work on the server. Your application will have no idea its requests are being stubbed, so there are no code changes needed.

##### Benefits

-  Control of response bodies, status, and headers
-  Can force responses to take longer to simulate network delay
-  No code changes to your server or client code
-  Fast, less than 20ms response times

##### Downsides

-  No guarantee your stubbed responses match the actual data the server sends
-  No test coverage on some server endpoints
-  Not as useful if you’re using traditional server side HTML rendering

##### Suggested Use

-  Use for the vast majority of tests
-  Mix and match, typically have one true end-to-end test, and then stub the rest
-  Perfect for JSON APIs

#### Without Stubbing Responses

Requests that are not stubbed actually reach your server. By not stubbing your responses, you are writing true end-to-end tests. This means you are driving your application the same way a real user would. When requests are not stubbed, this guarantees that the contract between your client and server is working correctly.

In other words, you can have confidence your server is sending the correct data in the correct structure to your client to consume. It is a good idea to have end-to-end tests around your application’s critical paths. These typically include user login, signup, or other critical paths such as billing.

##### Benefits

-  Guaranteed to work in production
-  Test coverage around server endpoints
-  Great for traditional server-side HTML rendering

##### Downsides

-  Requires seeding data
-  Much slower
-  Harder to test edge cases

##### Suggested Use

-  Use sparingly
-  Great for the critical paths of your application
-  Helpful to have one test around the happy path of a feature

#### Stubbing

Cypress enables you to stub a response and control the body, status, headers, or even delay.

To begin stubbing responses you need to do two things.

1. Start a cy.server()
2. Provide a cy.route()

These two commands work together to control the behavior of your responses within the command’s options. cy.server() enables stubbing, while cy.route() provides a routing table so Cypress understands which response should go with which request.

```
cy.server()           // enable response stubbing
cy.route({
  method: 'GET',      // Route all GET requests
  url: '/users/*',    // that have a URL that matches '/users/*'
  response: []        // and force the response to be: []
})
```

We configure the base url in cypress.json so when we use cy.visit it by default considers the url with base url and adds the string we sent to the visit method

### Cypress Best Practices

Read about cypress best practices [here](https://docs.cypress.io/guides/references/best-practices.html)

### Cypress Folder Structure

When we install cypress and run the test runner for the first time a folder named `cypress` will be automatically added to the repo along with public other existing folders. This folder consists of

1. fixtures - this file will be used to check for responses for requests
2. integration - all the end to end test case files(spec files) will be added in this folder
3. plugins
4. support - this folder consists of command.js file in which we can define custom commands

In addition to these we add the following folders

#### constants

-  Common
-  i18nConstants
-  RouteConstants
-  APIConstants
   -  APIEndPoints (Different flows endpoints files)
   -  APIMethods
   -  APIStatuses

#### reusableActions

This folder consists of all the actions that are used multiple times while testing written as methods that can be reused. The actions that are used for all flows are defined in Common folder and those that are flow specific are defined in the folders of the specific flow

###### Examples

```
export function clickUsingDataTestID(dataTestID) {
   return cy.get(`[data-testid=${dataTestID}]`).click()
}
```

This function above is can be used to get an element using its data-testid and then click it, this action is a very common action which will be performed in many cases so for this we define a function that can be used from one single place

#### stubs

This folder is used to store different stub calls for requests made to backend. Each flow has individual stub folder

### Example Test suite

Let us write end to end test for a scenario of user successful login

1. Visit the home page
2. Click on login or sign up
3. Select Log in Tab
4. Enter your email id and password
5. Click on login and you will be redirected to website home page

```
constants/RouteConstants

export const HOME_PAGE = '/home'

export const LOGIN_PAGE = '/login'
```

```
reusableActions/Common

export function checkCurrentRoute(route) {
   cy.url().should('include', route)
}

export function clickUsingDataTestID(dataTestID) {
   return cy.get(`[data-testid=${dataTestID}]`).click()
}

export function typeUsingDataTestID(dataTestID, value) {
   return cy.get(`[data-testid=${dataTestID}]`).type(value)
}

```

```
reusableActions/Login

export function goToLoginPage() {
  cy.visit(LOGIN_PAGE) // will be imported from route constants
}

export function goToHomePage() {
  cy.visit(HOME_PAGE) // will be imported from route constants
}

```

```
stubs/Login

export function stubGetUserProfile() {
   cy.route({
      method: apiMethods.get, //API Methods GET, POST, PUT
      url: apiEndpoints.userProfile, // API Endpoint for the request
      status: apiStatuses.success, // API Status of the request
      response: userProfileDetails
   }).as('getUpdatedUserProfile')
}
```

```
integration/Login.js

describe('User Login ', function() {
   beforeEach(() => {
      cy.server()
      goToLoginPage()
   })

   it('should login user successfully', function() {
      clickUsingDataTestID(loginPageDataTestIds.loginOrSignUpButton)
      clickUsingDataTestID(loginPageDataTestIds.loginTab)
      typeUsingDataTestID(loginPageDataTestIds.email)
      typeUsingDataTestID(loginPageDataTestIds.password)
      stubGetUserProfile()
      clickUsingDataTestID(loginPageDataTestIds.loginButton)
      checkCurrentRoute(HOME_PAGE)
   })
})
```
