---
title: ORMs Considered Harmful 
date: 2024-09-09T12:19:30+03:00
---

Alright, the title is a click bait and ORMs are not harmful. With that out of the way,  I am going to make a case against ORMs and perhaps persuade you to write your own SQL instead. I have worked in teams where the use of ORMs was a default, unquestioned choice and  I don't think they served us well in the long run.

To be fair, ORMs help you move fast in the early stages of development but as the product matures and activity on the system increases ORMs begin to show their ugly side because queries that worked fine before are now slow and need to be optimised. For example, here is an actual case I encountered. A seemingly simple ORM query resulted in a SQL statement that joined six tables, included unused columns and took several seconds to execute -- far too long for a real-time system.

Normally, you would look at the generated SQL but then you realise that the generated SQL is inscrutable and hard to understand. But how can you fix it if you don't understand it? That is why I prefer writing my own SQL. I am suspicious of code I don't understand and I like to know exactly what my code is doing. The last thing I want to do is a [Hail Mary](https://en.wikipedia.org/wiki/Hail_Mary_pass) in production. 

A few things make me more anxious than debugging a production data model using an ORM because a model's methods might perform other side effects that lead to data corruption. Consider the  case where I want to find out how many apples Adam ate. The query to do this sounds fairly simple but a model's method can be overridden and side effects introduced. With SQL, debugging is straightforward because no application logic is executed as you query the database. 

If you think about it, ORMs are really a DSL(domain specific language) and if you learn how to use the Django ORM you will still have to learn how to use Ruby On Rails' ActiveRecord. The knowledge is not transferable. But SQL is SQL, learn it once and use it everywhere and in a world where devs frequently switch languages and frameworks, SQLs portability is a huge advantage.

In conclusion, ORMs help you move fast initially but that might come at the cost of long term maintainability and performance.  SQL allows you to take control of your database interactions, optimize performance and debug more effectively. 

