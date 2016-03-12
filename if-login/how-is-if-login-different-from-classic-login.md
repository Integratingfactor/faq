## What are the things that a user coming from the background of loginname/pwd based authentication need to know in order to make a leap to integration factor APIs?
From end user's perspective, authentication experience with iF Login based application would be slightly different in following sense:
* end users will authenticate themselves with iF Login service (skipped if their client is pre-authenticated, e.g. for existing browser session) to establish ownership of end user identity
* end users will explicitly grant authorization to the application to access their identity (this is reversed in the sense that application is requesting authorization from end user to work with their identity)

Now, technical explanation for this difference in user experience is because:
* iF Login is #BYOI based, which means end users own their identity, not the application
* end user, who is the identity owner, gives permission to the iF Login based applications to work with their identity
* end users do not authentication with the application, instead the application requests authorization to get access to their identity
* Identity for end users is hosted on IDP service from Integratingfactor.com and not on the application
* end users authenticate with IDP service to access their identity, so that they can grant access to application to work with their identity

In general, we need to understand the difference between authentication and authorization. Application security relies on both, proper authorization for correctly authenticated identity. In the iF Login framework, applications assign roles to users and implement RBAC to protected resources based on user role. IDP service is responsible to correctly authenticate the user's identity and provide the associated roles of that identity to the application.
