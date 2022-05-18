import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly root_url = environment.root_url;

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post<any>('http://localhost:9090/auth/signup', data);
  }

  /**
   * to login
   *
   * @param data
   * @returns
   */
  login(data: any) {
    return this.http.post<any>(this.root_url + 'login', data);
  }

  /**
   * to get departments
   *
   * @returns
   */
  getDepartments() {
    return this.http.get<any>(this.root_url + 'get-all-departments');
  }

  /**
   * to get courses
   *
   * @returns
   */
  getCourses(dep_id: number) {
    return this.http.get<any>(this.root_url + `get-all-courses/${dep_id}`);
  }

  /**
   * to add paper
   *
   * @param data
   * @returns
   */
  addPaper(data: any) {
    return this.http.post<any>(this.root_url + 'add-question-paper', data);
  }

  /**
   * to get question papers
   *
   * @returns
   */
  getQuestionPapers() {
    return this.http.get<any>(this.root_url + 'get-question-paper');
  }

  /**
   * to accept or reject
   *
   * @param data
   * @returns
   */
  acceptOrReject(data: any) {
    return this.http.post<any>(this.root_url + 'accept-or-reject', data);
  }

  /**
   * to get students papers
   * 
   * @param data 
   * @returns 
   */
  getStudentsPapers(data: any) {
    return this.http.post<any>(this.root_url + 'get-student-question-paper', data);
  }

  /**
   * to get all years
   * 
   * @returns 
   */
  getAllYears() {
    return this.http.get<any>(this.root_url + 'all-year');
  }
}
