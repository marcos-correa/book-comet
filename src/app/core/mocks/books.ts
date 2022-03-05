import { Bookin } from '../models/bookin.model';

// An example of using a mock for static menu construction in the navbar
export const BOOKS: Bookin[] = [
  {
    name: 'Design Thinking',
    year: 2012,
    authors: ['Maurício Vianna'],
    summary:
      'This book presents steps, techniques and tools, illustrated through genuinely Brazilian cases, to inspire and assist in the endeavor towards innovation.',
  },

  {
    name: 'The Pragmatic Programmer',
    year: 1999,
    authors: ['Andrew Hunt and Dave Thomas'],
    summary:
      'This book is a collection of tips for programmers that will teach you that coding is a collective effort.',
  },

  {
    name: 'Clean Code',
    year: 2008,
    authors: ['Robert C. Martin'],
    summary:
      'Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship',
  },

  {
    name: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    year: 1994,
    authors: ['Erich Gamma, John Vlissides, Richard Helm and Ralph Johnson'],
    summary:
      ' In this book you will find 23 software design patterns aimed at making software more efficient, flexible and, at the same time, elegant.Usable practical examples that will help you to better conceive your projects as a developer.',
  },

  {
    name: 'Critique of Pure Reason',
    year: 1781,
    authors: ['Immanuel Kant'],
    summary:
      'If you’re thinking about the five key texts for an understanding of Kant, this has got to be one of them.',
  },

  {
    name: 'Hamlet',
    year: 2008,
    authors: ['William Shakespeare'],
    summary:
      ' Hamlet by William Shakespeare, is a classic work that is permanently current for the force with which it deals with fundamental problems of the human condition.',
  },

  {
    name: 'The Metamorphosis',
    year: 1915,
    authors: ['Franz Kafka'],
    summary:
      "One of Kafka's best-known works, Metamorphosis tells the story of salesman Gregor Samsa, who wakes one morning to find himself inexplicably transformed into a huge insect.",
  },

  {
    name: 'Thus Spoke Zarathustra',
    year: 1961,
    authors: ['Friedrich W. Nietzsche'],
    summary:
      'Thus Spoke Zarathustra remains his most famous and influential work. It describes how the ancient Persian prophet Zarathustra descends from his solitude in the mountains to tell the world that God is dead and that the Superman, the human embodiment of divinity, is his successor.',
  }
];
