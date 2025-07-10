# Call-logging-system


scalability and performance benefits:
•	30,000+ Calls/Month: The CallLog schema is optimized with indexes and supports sharding, handling high write and read volumes efficiently. Connection pooling and transactional writes ensure performance and reliability. 
•	Many-to-Many Relationships: The CallLog collection links officers and clients, with interactionHistory arrays in Client and Officer enabling efficient querying of interactions. Indexes and population optimize performance. 
•	Real-Time Logging + Analytics: Transactions in createCallLog ensure consistent real-time logging, and aggregation pipelines in analyticsService.js provide efficient analytics, supported by indexes.
•	Horizontal Scaling: The stateless API design allows running multiple Node.js instances behind a load balancer, supporting increased traffic from 50+ officers. 
•	Error Handling: The errorHandler.js middleware catches Mongoose errors, ensuring stability under invalid inputs or high load. 
•	Modular Design: The separation of routes, services, and models simplifies maintenance and extension, supporting scalability as new features are added.

Database Structure:
1. call_logs Collection (CallLog.js)
Purpose: Stores individual call records, acting as the junction table for the many-to-many relationship between officers and clients.
Fields:
•	officerId: References an officer in the officers collection (ObjectId, required, indexed).
•	clientId: References a client in the clients collection (ObjectId, required, indexed).
•	duration: Call duration in seconds (Number, required).
•	type: Call direction (incoming or outgoing, String, required).
•	outcome: Call result (successful, missed, follow-up, failed, String, required).
•	comment: Optional notes about the call (String, max 500 characters).
•	timestamp: Date and time of the call (Date, defaults to current time, indexed).
•	__v: Mongoose versioning field (Number, auto-managed).

2. clients Collection (Client.js)
Purpose: Stores client information and tracks their interaction history with officers via call logs.
Fields:
•	name: Client’s full name (String, required, max 255 characters).
•	contactInfo: Nested object with: 
o	phone: Contact number (String, required, max 20 characters).
o	email: Optional email address (String, max 255 characters).
•	region: Geographic region (String, required, indexed).
•	status: Client status (active, inactive, prospective, String, defaults to active).
•	interactionHistory: Array of interaction records, each with: 
o	callLogId: Reference to a CallLog document (ObjectId, references call_logs).
o	note: Optional interaction notes (String, max 500 characters).
o	outcome: Interaction result (String, max 100 characters).
o	timestamp: Interaction date (Date, defaults to current time).

3. officers Collection (Officer.js)
Purpose: Stores sales officer information and tracks their interaction history with clients.
Fields:
•	Similar to Client.js, with name, contactInfo, region, status, and interactionHistory.
•	status has fewer options (active, inactive), reflecting officer employment status.

Why choose MongoDB:
MongoDB was chosen over SQL for this sales tracking system due to its flexibility with semi-structured data (e.g., call logs with optional comments), horizontal scalability for handling 30,000+ calls/month, high write performance for real-time logging, and seamless integration with Node.js. Its approach to many-to-many relationships (via call_logs and interactionHistory) and efficient analytics (via aggregation pipelines) aligns with the project's needs, making it a better fit compared to SQL's vertical scaling limitations and rigid schemas. While SQL excels in scenarios requiring strict data integrity and complex relational queries, MongoDB's strengths in scalability, performance, and development ease make it the optimal choice for this application.
