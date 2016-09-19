#!/usr/bin/env python



file = open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\salida.txt", "r")
for line in file:
	x = line.split(",")
	print (x[0],'\t',x[1])
