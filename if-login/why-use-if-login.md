## I think my web application is secured. This application is built using loginname/pwd based authentication model. Should I still think of switching to API based authentication?
There are following considerations when evaluating iF Login based Web Security as a Service in comparison to traditional solutions:
* is your application architecture API driven (e.g., micro services)
* is your application native cloud app
* do you have frontend separate from backend service (e.g., mobile clients or packaged frontend apps)
* liability factor for any security compromise versus ongoing cost of security updates

So, if the application has very simple architecture, and not much liability concerns, then a traditional authentication scheme of loginname/password with local storage is sufficient. Choice is between cost of implementing a local solution, or leveraging iF Login's free project tier with zero cost.

However, for any complex application that has native cloud architecture and/or API driven architecture and/or distributed architecture with frontend access separate from backend services, in such cases authentication and authorization solutions are critical, expensive and need to be continuously on par with industry standards. For these applications, iF Login becomes a very attractive proposal where a solid enterprise grade solution is available with no upfront cost and day 1 availability
