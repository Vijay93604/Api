package Api;

import java.io.IOException;
import java.sql.Connection;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ApiCall")
public class ApiCall extends HttpServlet {
	private static final long serialVersionUID = 1L;
      
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println(request.getParameter("word"));
		response.getWriter().append(ModelApi.getDetailsFromApi(request.getParameter("word")));
	}
	Connection s = null;
}
