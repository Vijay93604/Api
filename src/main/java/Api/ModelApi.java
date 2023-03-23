package Api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;

public class ModelApi {
	
	public static String getDetailsFromApi(String word) {
		JSONArray jobj = new JSONArray();
		String apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"+word;
		try {
			URL url = new URL(apiUrl);	
			HttpURLConnection con = (HttpURLConnection)url.openConnection();
			con.setRequestMethod("GET");
			int responseCode = con.getResponseCode();
			
			if(responseCode != 200) {
				return "Error";
			}
			
			String inp = "";
			BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
//			Scanner br = new Scanner(new InputStreamReader(con.getInputStream()));
			String val = "";
			
			while((inp = br.readLine()) != null) {
				val += inp;
			}
			
			System.out.println(val);
			
			 jobj = new JSONArray();
			JSONParser jp = new JSONParser();
			
			jobj = (JSONArray)jp.parse(val);
			System.out.println(jobj);
			
		} catch (Exception e) {
			e.printStackTrace();	
		}
		
		
		return jobj.toJSONString();
	}
	
}
