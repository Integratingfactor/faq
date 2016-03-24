## How to use iF Login?

### Overview of iF Login process
An [iF Login](https://github.com/Integratingfactor/faq/blob/master/if-login/How%20is%20iF%20Login%20different%20from%20classic%20login.md) consists of 2 distinct steps:

#### User authentication
As a first step, user is authenticated with IDP service, based on their centralized identity with Integratingfactor.com IDP service. For this step, application redirects the user to the IDP service.  
> Please note, at the end of this first step, application still does not know if user has been truely authenticated. Therefore next step is required.

#### Authorized access token
After user has been authenticated by IDP service, an explicit approval is seeked from the user, to grant access to the application to represent user on this cloud platform. Once user provides approval, an OAuth2 access token is granted to applications.  
> Once applications have the access token, they can validate user's identity with IDP service using that access token, and the iF Login process is complete.

### Message flow in iF Login process
Actual message flow in the iF Login process depends on the application type. There are following different options:
#### Untrusted Endpoint applications using client side scripts only
An application may consist solely of client side script, e.g., a static website hosted on [GitHub pages](https://pages.github.com/). In suche cases, web server is a simple service to serve static content, and all the processing would be on user's browser using client side script (e.g. Javascript).

Such applications are not considered trusted because user agent has complete access to all application logic/code and any token grants. These simple applications only have an implicit token grant available with very limited scope. A typical application of this type would be a simple blog, or a simple front end UI hosted separately from other backend services.

Below is a message flow diagram for untrusted iF Login:

#### Trusted Endpoint or Backend applications
A more secured option is for the applications to be hosted on a web server, that can do some smart processing. In such cases, user agent client does not get access to the authorized access token and the hosted application code/logic. Such applications have higher level of trust and have more privileged information available about the user.

Below is a message flow diagram for trusted iF Login:
