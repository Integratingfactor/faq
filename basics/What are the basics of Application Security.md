## What are the basics of Application Security?
Modern web application security has following basic components:

#### Authentication (a.k.a. AuthN)

A typical application would like to distinctively know each individual user accessing the application services. It may not be necessary to know all the user details, e.g., their name, location etc., but at the very minimum we need following:
1. be able to uniquely identity an individual user from all other users
1. be able to consistently identitify the same individual user across multiple different service requests

Authentication deals with fulfilling above basic requirements, to correctly and uniquely identify a user across all service requests.
> _(Please note that an application may choose not to identify users uniquely, in which case it may only have requirements for proper authorization only.)_

#### Authorization (a.k.a. AuthZ)

Authorization checks are about protecting resources (service requests/features) with appropriate access controls. Typically, in modern applications, this access control is tied to specific roles defined within the application's context. A protected resource access requires some kind of credentials that establish the role of the requestor. Application has role based access control (RBAC) checks in place, that validate the credentials of the requestor and grant/deny access to protected resource based on access role requirements for the resource.

> _(Please note, for RBAC, its not necessary to uniquely identify the requestor. Only requirement is that requestor can present credentials with required role to access the protected resource.)_

#### Encryption (data protection)

It is imperative that modern web applications implement proper encryption and protection of user data, to protect their privacy as well as to provide "Defense in depth" against any potential security breach that leads to unauthorized access to user data.

There are 3 levels of user data protection:
1. protecting data in transit
1. protecting data at rest
1. protecting shared data

While #1 above is commonly used and is easy to accomplish, the other 2 levels of protection are many times overlooked or neglected. Unfortunately, most of the security breaches occur due to lack to proper protection of the #2 and #3 above.