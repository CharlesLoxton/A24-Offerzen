# Round 2 Answers

## 1. Code Review and Refactoring

If I had more time and resources I would build the app using Fastify.js, this is a low overhead web framework for Node.js that is 5 times faster than Express.js because it comes with a highly optimized JSON schema-based validation library, which is must faster than the dynamic runtime validation used by Express. If I had more resources I would also implement a caching strategy using Redis, to cache short URLs for faster retrieval and to reduce load on the database.

## 2. System Scalability Analysis

One of the bottlenecks my current application faces is that it has to read from the database with every call to the API. We can implement a caching strategy by using a dedicated caching mechanism such as Redis, to store frequently accessed Short URLs. We can then modify the code to search for Short URLs inside the cache before it tries to find it in the database. Another scaling strategy would be to scale the web app horizontally. We can deploy more instances and setup a Load Balancer to redirect traffic to healthy instances of our web app.

## 3. Security and Data Integrity

In the current system, we don't do any user authentication. This means that anyone on the internet can access my API if I deployed it to a server with an Internet Gateway. This causes a security risk because users can make as many requests to my server as they desire. We can setup mechanisms such as request limiting per IP or per authenticated user. Or we can implement Recaptcha checks to secure our API from bots. To ensure data integrity in my application I would enable Replication and Sharding on my MongoDB database. This will maintain multiple copies of the data across different servers. This provides fault tolerance and ensures that the system remains available even if one server goes down.

## 4. New Feature Proposal

A new feature that I would propose would be custom short URLs. This feature would allow the user to decide what their short URL should be. To implement this I would modify my `POST /short` route to accept another body parameter called `short_url` with constraints of being at least 6 characters in length, no whitespaces, no characters that can interfere with URLs such as `&` and `?`, and it must be unique. This would require that the `original_url` property is no longer unique because multiple users can create custom short URLs for the same original URL. If no `short_url` parameter is provided, then we will automatically upsert one the same way we do it in the current code and keep it as the default.
