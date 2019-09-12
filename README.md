# Memory Foam 
Prevent jumpy divs when loading asyncronous content.

# Usage
Import the memory foam component. 

```
import MemoryFoam from 'memory-foam';
```  

Wrap your "jumpy" component in your `<MemoryFoam>` and pass a unique `mid` and your site's cookies as props:  
```
<MemoryFoam mid="UNIQUE_ID" cookies={cookies}>
  <div>I am jumpy</div>
</MemoryFoam>
  
```
    
That's it! 

