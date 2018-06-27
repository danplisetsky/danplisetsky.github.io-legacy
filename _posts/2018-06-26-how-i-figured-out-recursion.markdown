---
layout: post
section:  Blog
title: "How I Figured Out Recursion, or Recursion Solves Everything"
tags: how-i-figured-out functional-programming
---

![recursion][recursion-image]

{% include how-i-figured-out.md %}

## What

I think the reason it took me way too many years to grasp recursion is that I hadn't encountered the right way to think about it, to conceptualize it, if you will. Here are the few ideas that helped me turn recursion from something I'd shuddered from using and even looking at to one of the most valuable tools I have under my belt today.

### I

Imagine you are going for a run at a running track, and you want to complete 20 laps. You could say,

- "In order to run 20 laps, I'll start with running just one lap. Then I'll run one more, and one more, and so on until I'll have run 20 laps."

Or you could say,

- "In order to run 20 laps, I'll just need to run 19 laps, and then one more. How would I end up running 19 laps? I'll do 18 laps, and then one more. And so on. How would I know when I'm done? When I'm at zero -- no more laps left."

That's the difference between thinking about processes iteratively and recursively. The point of the latter is to reduce the initial problem to a smaller problem, and then reduce that to an even smaller problem, until what's called a **'base case'** is reached, meaning there's nothing more left to reduce.

### II

The other idea has nothing to do with recursion, but it'll be invaluable in helping us figure it out. It's called the **substitution model**. It's what we're going to do to untangle the intricacies of ...

### III

Recursive processes and iterative processes in recursively defined functions. Heavy stuff, right? Let's look at a few examples right away.

## How

First, the substitution model. Here are two simple functions. One takes two numbers and returns their sum. The other takes a number and squares it (all the code examples will be in JavaScript).

<script src="https://gist.github.com/danplisetsky/30bb8f273e52204b3c8f869d164a6d53.js"></script>

Now let's say we want to add two numbers, 3 and 4, together and square the result.

```javascript
square(add(3, 4));
```

I don't know about you, but that already looks kinda complex to me. So let's substitute the arguments to our functions for their respective formal parameters to see what's going on. Here's what we get:

```javascript
square(add(3, 4))

⬇⬇⬇⬇⬇⬇⬇⬇⬇

square(3+4)

⬇⬇⬇⬇⬇⬇⬇⬇⬇

square(7)

⬇⬇⬇⬇⬇⬇⬇⬇⬇

7 * 7

⬇⬇⬇⬇⬇⬇⬇⬇⬇

49
```

I strongly recommend doing this on paper, by the way. In fact, I'd say that writing out code on paper in general, especially when it's for highly specialized functions like in this case, is extremely beneficial, but maybe that's just me. Anyway, I digress.

The point is, what we did above was that we, step by step, **substituted** every function call with the body of the corresponding function.

_The big takeaway is that it doesn't matter if the runtime evaluates our code in a different manner. We only care about the result._

Well, that's not entirely true. The substitution that we just saw works for strictly evaluated languages -- JavaScript is one of them. We're not going to go deep in lazy evaluation here, which is another way to evaluate expressions, but for the sake of showing the difference, here's how a lazily evaluated substitution model would look like:

```javascript
square(add(3, 4))

⬇⬇⬇⬇⬇⬇⬇⬇⬇

add(3,4) * add(3,4)

⬇⬇⬇⬇⬇⬇⬇⬇⬇

(3+4) * (3+4)

⬇⬇⬇⬇⬇⬇⬇⬇⬇

7 * 7

⬇⬇⬇⬇⬇⬇⬇⬇⬇

49
```

In this case, the result is the same. We're going to stick with the strictly evaluated substitution model for now.

{:.horizontal-rule}

---

Now we're ready to tackle recursion. Recall that in the example with running laps, we were actually counting down -- to run 20 laps is to run 19 laps (and one more) which is to run 18 laps (and one more) and so on. _Ad infinitum?_ Not really. At some point, we want to stop. Here, we'll stop at zero -- we can't run less than zero laps. Now let's apply that same thinking to the problem of defining a function that calculates the factorial.

The factorial of an integer is the product of that integer and all the integers below it. For instance, the factorial of four is 4 \* 3 \* 2 \* 1 = 24. See the recursion creeping up yet?

Let's define it formally:

$$
Factorial(n) = \left\{\begin{array}{lr}
1, & \text{for } 0\leq n\leq 1\\
n\cdot Factorial(n-1), & \text{otherwise}\\
\end{array}\right\}
$$

The definition reads, if the input to the factorial function is 0 or 1, the answer is 1. If not, the answer is the result of multiplying the input by what the factorial function applied to the input minus 1 results to. Abandon all thought and code it at once!

<script src="https://gist.github.com/danplisetsky/412c9d1c9eaad7b3cb94d5f70f3f66d1.js"></script>

That was easy. It practically coded itself.

And now let's substitute.

```javascript
factorial(4)
// is 4 equal to 0 or 1? Nah. Hence, we'll go with the second option:

⬇⬇⬇⬇⬇⬇⬇⬇⬇

4 * factorial(3)
// Now we evaluate factorial(3). Is 3 equal to 0 or 1? Nope

⬇⬇⬇⬇⬇⬇⬇⬇⬇

4 * (3 * factorial(2))
// I add the parentheses here to illustrate that the code inside them is going to be evaluated first.
// We'll see the significance of it soon. In the meantime, 2 is still not 1. Or 0, for that matter

⬇⬇⬇⬇⬇⬇⬇⬇⬇

4 * (3 * (2 * factorial(1)))
// Finally, we've reached -- you got it -- the base case. As per definition, we humbly return 1

⬇⬇⬇⬇⬇⬇⬇⬇⬇

4 * (3 * (2 * 1))

⬇⬇⬇⬇⬇⬇⬇⬇⬇

4 * (3 * 2)

⬇⬇⬇⬇⬇⬇⬇⬇⬇

4 * 6

⬇⬇⬇⬇⬇⬇⬇⬇⬇

24
```

Here's what's going on here. We start with trying to evaluate `factorial(4)`. We have two options: if the input is 0 or 1, immediately evaluate to 1. Otherwise, we put the input on the stack -- that is, we _remember_ that the input -- 4 in this case -- is to be multiplied by later, as the _last step before we return the final result_. This part, I believe, is crucial to understanding recursion. Once again, writing the whole process of evaluation out on paper made it very clear to me.

Ok, so we memorize the '4 times something' part. What next? Evaluating `factorial(3)`. Imagine for a second that we started with `factorial(3)`, that there was nothing before that. What would be the result? '3 times something'. And what is something? `factorial(2)`, which in turn evaluates to '2 times something'.

Now, this time around, the something -- `factorial(1)` -- actually evaluates to something we can immediately say is a tangible result -- the number 1 (since the condition is, return 1 is the input is either 0 or 1).

```javascript
factorial(4)
4 * factorial(3)
    3 * factorial(2)
        2 * factorial(1))
            1
```

Here comes the cool part: we start to _remember!_ That is, we start to go up the stack, evaluating the 'X times something' expressions one by one. We substitute `factorial(1)` in the representation above with 1 and evaluate it: 2 \* 1 = 2. Great, this 2 is now the result of `factorial(2)`, which we can substitute in the next expression, 3 \* `factorial(2)`, which will result in 3 \* 2 = 6. One last step left: 4 \* `factorial(3)` ➡ 4 \* 6 = 24. And that's our answer, which is what `factorial(4)` will return.

{:.horizontal-rule}

---

That's all there is to recursion, basically. Reducing the initial problem (`factorial(4)`) to a smaller problem (`factorial(3)`) to an even smaller problem (`factorial(2)`) and an even smaller one (`factorial(1)`) until there's nothing left to reduce. As you saw from the formal definition of factorial, it even translates quite naturally to code.

There's something missing, though, don't you find? Let's look at how `factorial(4)` was evaluated once more (or, which is a bit more pertinent, what kind of _process_ did it generate).

```javascript
factorial(4);
4 * factorial(3);
4 * (3 * factorial(2));
4 * (3 * (2 * factorial(1)));
4 * (3 * (2 * 1));
4 * (3 * 2);
4 * 6;
24;
```

See how it's sort of expanding until it reaches the base case, and then it starts to contract? That's because the call to `factorial(4)` is not equal to the call to `factorial(3)`, and we need a way to keep track of that. That's what stack is for: it records the sequence in which we dispatched calls to our factorial function so that we'd know what to do after reaching the base case. What's the catch? It consumes memory, and it's far from unlimited when it comes to stack size.

Is there another way we can define the factorial function so that we won't have to care about stack size? Indeed there is.

<script src="https://gist.github.com/danplisetsky/880433dfa9a865dd81d4d6642aca2976.js"></script>

As you can see, the difference is subtle, but it's substantial in terms of the type of process these two factorial functions we've defined are going to generate (as you've probably guessed from the name already).

The second function, `factorialIter`, takes two arguments, one of which has a default value. Its name, `acc`, refers to the fact that such a way of solving a problem is sometimes called the '**Accumulator Pattern**' because we're _accumulating_ -- carrying the result around with us until it's time to return it.

Ok, since we're kinda confused as to what this function is going to do (differently), let's jump straight to substitution.

```javascript
factorialIter(4) // since we're only passing one argument,
//the second parameter, acc, will take its default value, which is 1

⬇⬇⬇⬇⬇⬇⬇⬇⬇

factorialIter(3, 4) // 1 * 4 ➡ 4

⬇⬇⬇⬇⬇⬇⬇⬇⬇

factorialIter(2, 12) // 4 * 3 ➡ 12

⬇⬇⬇⬇⬇⬇⬇⬇⬇

factorialIter(1, 24)
// The base case is reached

⬇⬇⬇⬇⬇⬇⬇⬇⬇

24
```

As before, we start with trying to evaluate `factorialIter(4)`. 4 doesn't equal 0 or 1, so we're following the second path, which results in another call to our function: `factorialIter(4 - 1, 1 * 4)` ➡ `factorialIter(3, 4)`.

We repeat this several times until we reach the base case. `factorialIter(1, 24)` returns `acc`, which is 24.

Let's look at the process generated by `factorialIter`.

```javascript
factorialIter(4);
factorialIter(3, 4);
factorialIter(2, 12);
factorialIter(1, 24);
24;
```

No expansion, right? That's because the calls to the function are replaced on the stack since they are effectively equivalent. Calling `factorialIter(4)` is the same as calling `factorialIter(3,4)`, `factorialIter(2, 12)` or `factorialIter(1, 24)` in a sense that they all result to the same value.

That's the difference between iterative processes and recursive processes. Even though both functions are defined recursively -- _in terms of themselves_ -- the processes they generate are quite different. Practically speaking, if the last call that a function makes in its definition is to itself, it'll generate an iterative process. `factorialIter` calls itself, and that's the last thing it does (such a function is called '**tail-recursive**').

On the other hand, if a function calls itself in its definition, but it's not the last thing it does, it'll generate a recursive process. `factorial`'s last call is to the built-in multiplication function and not itself.

## Why

If you've gotten this far, you might be asking, "This recursion business is cool and all, but do I really need to figure it out? Why not just stick with the usual, loopy -- get it? -- way of doing things?"

That's a fair question. Even though you'll probably be fine without recursion, once you get the hang of it, you won't be able to put it down, so to speak, just on account of how versatile it is.

Let's think about data structures. Lists, hash tables, binary trees -- all are not only useful in and of themselves but also a staple
of coding interviews. That is entirely reasonable -- whenever you'll want to implement some part of business logic in your code, you will inevitably be using data structures. Recursion provides you a
with a powerful technique for working with them -- _any of them_.

{:.horizontal-rule}

---

We'll illustrate how recursion helps us operate on elements of a list by solving the FizzBuzz problem. It goes as follows (as worded by [Daniel Bunte][fizz-buzz]):

> Write a program that prints the numbers from 1 to 100. If it’s a multiple of 3, it should print “Fizz”. If it’s a multiple of 5, it should print “Buzz”. If it’s a multiple of 3 and 5, it should print “Fizz Buzz”.

Let's try to immediately think about the problem in terms of data structures. What we're effectively asked to do is, given a list of numbers from 1 to 100, transform it into a list of strings according to certain rules. We will need to:

- Enumerate the list
- Transform its elements one by one
- Print the resulting list

Imagine you're at an interview and you're asked to solve FizzBuzz. You're so nervous that you can't remember any of the basic built-in functions. Looking at the outline above, you'd probably think of mapping over a list, but you just can't remember how to do it. Rejoice -- you don't have to! All you need is recursion. As stated in the title, it indeed solves (pretty much) everything.

What is mapping over a list? If the list is empty, the result is the same empty list. If the list consists of one element, it's this one element transformed and attached to an empty list. Two elements? It's almost like a list of one element, and then one more. You already know what to do.

<script src="https://gist.github.com/danplisetsky/90b27c535f52ff476341ddadfbd4b2ce.js"></script>

Easy as pie. Now to step 2:

<script src="https://gist.github.com/danplisetsky/a528e49afe1b99260207d0c7fd901691.js"></script>

And 3:

<script src="https://gist.github.com/danplisetsky/50d91adc42c90c7a3ca899c302d60e77.js"></script>

We'll also need a convenient way to generate the initial list. Remember, the built-int methods have vanished from our memory. But that's not going to stop us:

<script src="https://gist.github.com/danplisetsky/99b2daa5f9bf00bd4466d2b6bb9ba581.js"></script>

And this is it! All that's left is to fit the functions together:

```javascript
print(map(fizzBuzz, range(100)));
```

The best part is, the solution is scalable and lends itself to further abstraction. The `map` function can be expressed in terms of a right fold function (`reduceRight` in JavaScript), `print` in terms of `forEach`. Instead of checking for modulo in `fizzBuzz` we could pass a hash table of rules for substituting numbers with strings. And so on. There's all sorts of possibilities, and by using specialized functions and recursion we end up with elegant and reusable code.

## Conclusion

There's plenty more ideas left unexplored in this brief overview (in fact, the book that helped me get my head around recursion and many other concepts is [Structure and Interpretation of Computer Programs][sicp-book], and I cannot recommend enough). The most salient, in my mind, is the idea of functional programming that leverages recursion and promotes reusability and specialization of functions. I hope that now, armed with the power of recursion, you're more than adequately equipped to dive deeper into functional programming and other techniques for managing complexity, which is software development is really all about.

[recursion-image]: https://c1.staticflickr.com/3/2446/3620061163_ba9f8d5031_z.jpg?zz=1
[fizz-buzz]: https://hackernoon.com/why-im-still-using-fizz-buzz-to-hire-software-developers-7e31a89a4bbf
[sicp-book]: https://en.wikipedia.org/wiki/Structure_and_Interpretation_of_Computer_Programs
