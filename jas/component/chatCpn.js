components.chat=`
    <section class = 'chat-container'>
        <div class ="aside-left">
        <div id="list-conversation" class="list-conversation">
        </div>
        <form id ="form-add-conversation" class ="form-add-conversation">
            <div class ="input-wrapper">
                <input type="text" name = "title" placeholder="Enter conversation title">
                <div id ="title-error" class = "message-error"></div>
            </div>
            <div class = "input-wrapper">
                <input type="email" name="friendEmail" placeholder="Enter a friend email">
                <div id = "friend-email-error" class = "message-error"></div>
            </div>
            <button id = "form-add-conversation-btn" class="btn-icon" type="submit"><i class="fas fa-plus"></i></button>

        </form>


        </div>
        <div class = "current-conversation">
            <div id = "list-message" class ="list-message">
            </div>
            <form id = "form-add-message" class = "form-add-message">
              <div class="input-wrapper">
                  <input type="text" name = "message" placeholder="Enter your message">
              </div>
              <button id ="form-add-message-btn" type = "submit">Send</button>  
            </form>
        </div>
        <div class ="aside-right">
            <div id ="conversation-detailed" class = "conversation-detailed">
            </div>
            <form id ="form-leave-current-conversation" class="form-leave-current-conversation">
                <button class="leave-current-conversation-btn" id="leave-current-conversation-btn" type="submit">Leave conversation</button>
            </form> 
        </div>
    </section>
    
    
    `