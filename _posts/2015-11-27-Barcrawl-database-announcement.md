---
title: Barcrawl Update - Databases
category: tech
tags: [barcrawl, database, mysql, back-end]
---

I am pleased to announce that I have started developing a database back-end for
the Barcrawl web app and have been making good progress. Since I have deployed
Barcrawl using [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
 on Amazon AWS, I am limited to a MySQL database. But that is not a problem
 since my only previous experience is in MySQL. This database is meant to 
 reduce the application's dependency on API calls in the Python back-end. This
 decision comes in order to reduce the impact on the APIs' request quotas and
 to help reduce latency in the back-end since the rate of requests to 
 the Google Maps API have to be limited.

The database setup currently has three tables for cities, bars and distance
vectors. In order to keep results up-to-date, bars are only requested for 
cities that have not been updated in the past month, or that do not have enough 
bar entries saved in the database. Distance vectors between bars are also saved
to reduce the need to ask Google Maps for directions data. Once the database
has been fully implemented and tested I plan to fully explain its layout.