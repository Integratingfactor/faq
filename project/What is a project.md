## What is an application and a project? What kind of hierarchies exists in the arrangement of projects in Integratingfactor.com platform?
A project defines following attributes of an application:
* application architecture
* role definitions
* user base of the application with specific role assignements

#### Application architecture
Application architecture consists of how an application has been broken into components. Any modern application would have following components:
* endpoints : user interaction with the application would typically be either via mobile apps and/or javascript based client side scripts
* backends : actual business logic of the application would reside in the backend services, decomposed into micro-services (if applicable) and exposed via set of APIs
* APIs : these are the interface between different components of the application (e.g. endpoint clients to backend services interaction, or backend service to service interaction) with corresponding RBAC definitions
* RBAC : all APIs should define a role based access control policy explicitly so that appropriate RBAC checks can be implemented

#### Role definitions
Authenticating a user is just the beginning of security, and its purpose is only to ensure that a user is exactly who they claim they are. Just because a user has been authenticated, it does not mean that user will have access to all of application features. This is where roles come into picture, and based on the roles assigned to a user, they will have access to specific/controlled set of features within the application.

Each application's needs can be unique, and hence the project defintion for each application also defines roles and their meanings, as applicable to the application, as following:
* `GUEST` : any iF Login authenticated user that has not been assigned role explicitly for the project has a standard role of GUEST for the project
* `USER` : this is a standard role that a project can assign explicitly to an iF Login authenticated user, either via invitation, or via self-onbaording, to provide a controlled/restricted access for select users.
* `ADMIN` : this is a standard role that provides administrative and management access to an iF Login authenticated user. This role is automatically assigned to a user creating a project. Additional users can be invited or onboarded with `ADMIN` role to share administrative access to the project

Besides the above standard roles, each project can define custom roles, and application can implement RBAC based on these custom roles. Please notes, any such custom roles do not have any special meaning in Integratingfactor.com platform, application developers need to implement their own context for such custom roles.

#### Application users
An Integratingfactor.com platform user has a single unique account for all applications. Users do not created separate accounts for all different applications. This implies, a user is always authenticated on Integratingfactor.com's iF Login platform, and the application needs to define and assign explicit roles to Integratingdactor.com users, based on application need.

Unless a user is assigned one of the standard roles `USER` | `ADMIN`, or a project defined custom role, users will have a default role of `GUEST`.