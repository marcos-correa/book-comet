import { Bookin } from './bookin.model';

// An example of a class extension.
export interface Bookout extends Bookin{
  // In this case, the only difference between a book to be inserted and one 
  // that is returned by the service, is the existence of an id in this
  id: number;    
}