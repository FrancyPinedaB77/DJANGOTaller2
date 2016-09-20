import csv
import json
input =  open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\datos.csv","r")
output = open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\myjson.json","w")

for line in input:
    x = line.split(",")
    print ("{","name:",x[0],"children:[", "fecha",x[1,"]"])

  
# Open the CSV



#f = open( 'C:\Users\ASUS\Desktop\Downloads\Taller1BigData-master\Taller1BigData-master\static\js\datos.csv', 'rU' )
# Change each fieldname to the appropriate field name. I know, so difficult.  
#reader = csv.DictReader( f, fieldnames = ( "name","fecha","pais" ))
# Parse the CSV into JSON  
#out = json.dumps( [ row for row in reader ] )
#print "JSON parsed!"
# Save the JSON  
#f = open( 'C:\Users\ASUS\Desktop\Downloads\Taller1BigData-master\Taller1BigData-master\static\js\myjson.json', 'w')
#f.write(out)
#print "JSON saved!"
